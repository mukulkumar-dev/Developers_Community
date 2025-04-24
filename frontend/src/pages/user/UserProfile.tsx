import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { userAPI, projectAPI, blogAPI, questionAPI } from "../../../api";
import { User, Edit, Save } from "lucide-react";
import ProfileProjects from "@/components/user/ProfileProjects";
import ProfileBlogs from "@/components/user/ProfileBlogs";
import ProfileQuestions from "@/components/user/ProfileQuestions";

const UserProfile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    website: user?.website || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Convert skills string to array
      const updatedProfile = {
        ...profileData,
        skills: profileData.skills.split(",").map((skill) => skill.trim()),
      };

      await userAPI.updateProfile(updatedProfile);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update profile error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="md:col-span-1 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-devgray-200 dark:bg-devgray-700 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-devgray-500" />
                  </div>
                )}
                <h2 className="mt-4 text-xl font-semibold text-center">{user?.name}</h2>
                <p className="text-devgray-500 text-sm mt-1 text-center">{user?.email}</p>
              </div>

              <div className="mt-6 space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center"
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center"
                  onClick={() => setActiveTab("projects")}
                >
                  Projects
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center"
                  onClick={() => setActiveTab("blogs")}
                >
                  Blogs
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex justify-center"
                  onClick={() => setActiveTab("questions")}
                >
                  Questions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "profile" && (
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>View and edit your profile information</CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isLoading}
                  >
                    {isEditing ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Done
                      </>
                    ) : (
                      <>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </>
                    )}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          disabled={!isEditing || isLoading}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleChange}
                          disabled={!isEditing || isLoading}
                          className="mt-1 h-24"
                          placeholder="Tell others about yourself..."
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="skills">Skills</Label>
                        <Input 
                          id="skills"
                          name="skills"
                          value={profileData.skills}
                          onChange={handleChange}
                          disabled={!isEditing || isLoading}
                          className="mt-1"
                          placeholder="javascript, react, node.js, etc."
                        />
                        <p className="text-xs text-devgray-500 mt-1">Separate skills with commas</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="github">GitHub</Label>
                          <Input 
                            id="github"
                            name="github"
                            value={profileData.github}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                            className="mt-1"
                            placeholder="GitHub profile URL"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input 
                            id="linkedin"
                            name="linkedin"
                            value={profileData.linkedin}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                            className="mt-1"
                            placeholder="LinkedIn profile URL"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website"
                            name="website"
                            value={profileData.website}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                            className="mt-1"
                            placeholder="Your personal website"
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Profile"}
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "projects" && <ProfileProjects userId={user?._id || ""} />}
            {activeTab === "blogs" && <ProfileBlogs userId={user?._id || ""} />}
            {activeTab === "questions" && <ProfileQuestions userId={user?._id || ""} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;