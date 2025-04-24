
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { eventAPI } from "../../../api";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import SearchBar from "@/components/common/SearchBar";
import FilterTags from "@/components/common/FilterTags";
import { Calendar, Plus, Users } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImage: string;
  tags: string[];
  organizer: {
    _id: string;
    name: string;
    avatar: string;
  };
  attendees: string[];
}

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [eventTypeFilter, setEventTypeFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<string>("upcoming");

  // Fetch events based on filters
  const { data, isLoading, error } = useQuery({
    queryKey: ["events", searchTerm, selectedTags, eventTypeFilter, timeFilter],
    queryFn: () => eventAPI.getEvents({
      search: searchTerm,
      tags: selectedTags.join(','),
      eventType: eventTypeFilter !== "all" ? eventTypeFilter : undefined,
      upcoming: timeFilter === "upcoming" ? "true" : undefined,
      past: timeFilter === "past" ? "true" : undefined,
      page: 1,
      limit: 9
    }).then(res => res.data)
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Modified to accept a single tag instead of an array
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Format date range for display
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    
    const endStr = end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    
    return `${startStr} - ${endStr}`;
  };

  // Event type options
  const eventTypes = [
    { value: "all", label: "All Types" },
    { value: "webinar", label: "Webinar" },
    { value: "workshop", label: "Workshop" },
    { value: "hackathon", label: "Hackathon" },
    { value: "conference", label: "Conference" },
    { value: "meetup", label: "Meetup" },
    { value: "other", label: "Other" },
  ];

  // Tag options for events
  const tagOptions = [
    "javascript", "react", "nodejs", "python", "devops",
    "cloud", "frontend", "backend", "mobile", "ai", "blockchain"
  ];

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Developer Events</h1>
            <p className="text-muted-foreground mt-2">
              Discover, attend, or organize tech events for the community
            </p>
          </div>
          <Link to="/events/create">
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              Create Event
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Search</h3>
              <SearchBar onSearch={handleSearch} placeholder="Search events..." />
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Event Type</h3>
              <div className="space-y-2">
                {eventTypes.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`type-${type.value}`}
                      name="eventType"
                      value={type.value}
                      checked={eventTypeFilter === type.value}
                      onChange={(e) => setEventTypeFilter(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor={`type-${type.value}`}>{type.label}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-3">Filter by Tags</h3>
              <FilterTags 
                options={tagOptions} 
                selectedTags={selectedTags}
                onTagSelect={handleTagSelect}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="upcoming" className="mb-6" onValueChange={setTimeFilter}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="w-full">
                    <Skeleton className="h-40 w-full rounded-t-lg" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-destructive">Error loading events. Please try again later.</p>
              </div>
            ) : data?.events?.length === 0 ? (
              <div className="text-center py-10 border rounded-lg">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">Be the first to create an event!</p>
                <Link to="/events/create">
                  <Button>Create Event</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.events?.map((event: Event) => (
                  <Link to={`/events/${event._id}`} key={event._id}>
                    <Card className="overflow-hidden hover:border-primary transition-colors h-full flex flex-col">
                      <div className="h-48 bg-muted relative">
                        {event.coverImage ? (
                          <img 
                            src={event.coverImage} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            <span className="text-xl font-semibold">{event.title}</span>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="w-fit">
                            {event.eventType}
                          </Badge>
                          <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
                          <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Calendar size={14} />
                            {formatDateRange(event.startDate, event.endDate)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {event.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {event.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{event.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          {event.attendees ? event.attendees.length : 0} attendees
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;
