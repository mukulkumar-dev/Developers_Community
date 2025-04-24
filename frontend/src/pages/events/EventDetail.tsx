import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { eventAPI } from '../../../api';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Calendar, Timer, Users, MapPin } from 'lucide-react';
import EventCountdown from '@/components/events/EventCountdown';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isAttending, setIsAttending] = useState(false);

  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => eventAPI.getEventById(id!).then(res => res.data),
    onSuccess: (data) => {
      setIsAttending(data.event.attendees.some((attendee) => attendee._id === user?._id));
    }
  });

  const handleAttendClick = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to attend events",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await eventAPI.attendEvent(id!);
      setIsAttending(response.data.attending);
      toast({
        title: response.data.attending ? "You're attending!" : "Attendance cancelled",
        description: response.data.attending ? 
          "You have successfully registered for this event" : 
          "You have been removed from the attendee list",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance status",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !eventData) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-destructive">Failed to load event details</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const { event } = eventData;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              {event.coverImage && (
                <div className="relative h-[300px] w-full">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <div className="space-y-4">
                  <Badge variant="outline" className="w-fit">
                    {event.eventType}
                  </Badge>
                  <h1 className="text-3xl font-bold">{event.title}</h1>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <img
                        src={event.organizer.avatar}
                        alt={event.organizer.name}
                        className="aspect-square h-full w-full"
                      />
                    </Avatar>
                    <div>
                      <p className="font-medium">Organized by</p>
                      <p className="text-muted-foreground">{event.organizer.name}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                      <span>
                        {format(new Date(event.startDate), 'PPP')} - {format(new Date(event.endDate), 'PPP')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      <span>{event.attendees.length} attending</span>
                    </div>
                  </div>
                  <div className="prose max-w-none dark:prose-invert">
                    <h2 className="text-xl font-semibold mb-2">About this event</h2>
                    <p className="whitespace-pre-wrap">{event.description}</p>
                  </div>
                  {event.meetingLink && (
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">Meeting Link</h2>
                      <a
                        href={event.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {event.meetingLink}
                      </a>
                    </div>
                  )}
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">Time Remaining</h2>
                  </div>
                  <EventCountdown startDate={event.startDate} />
                </div>
                <Button
                  className="w-full"
                  variant={isAttending ? "outline" : "default"}
                  onClick={handleAttendClick}
                >
                  {isAttending ? "Cancel Attendance" : "Attend Event"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;