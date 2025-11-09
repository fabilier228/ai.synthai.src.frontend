"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Email,
  Person,
  VerifiedUser,
  Settings,
  Lock,
  PhotoCamera,
  Delete,
} from "@mui/icons-material";
import type { UserData } from "./interfaces";
import MyAccount from "./MyAccount";
import AccountManagement from "./AccountManagement";
import Security from "./Security";

const Profile = () => {
  const [userData, setUserData] = useState<UserData>({
    avatar: "/default-avatar.png",
    nickname: "alex_smith",
    fullName: "Alexander Smith",
    email: "alex.smith@synthai.com",
    status: "Active",
    registrationDate: "March 15, 2023",
    lastLogin: "Today at 2:30 PM",
  });

  const [activeTab, setActiveTab] = useState("account");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load avatar from localStorage on component mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setUserData((prev) => ({
        ...prev,
        avatar: savedAvatar,
      }));
    }
  }, []);

  // Save avatar to localStorage when it changes
  useEffect(() => {
    if (userData.avatar !== "/default-avatar.png") {
      localStorage.setItem("userAvatar", userData.avatar);
    }
  }, [userData.avatar]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    if (avatarPreview) {
      setUserData((prev) => ({
        ...prev,
        avatar: avatarPreview,
      }));
      setAvatarPreview(null);
    }
  };

  const handleCancelAvatar = () => {
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    setUserData((prev) => ({
      ...prev,
      avatar: "/default-avatar.png",
    }));
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    localStorage.removeItem("userAvatar");
  };

  const currentAvatar = avatarPreview || userData.avatar;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-success";
      case "Premium":
        return "text-warning";
      case "Email Unverified":
        return "text-error";
      default:
        return "text-text";
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-12 px-4 pb-20 md:pb-12">
      <div className="w-full max-w-[370px] md:max-w-none">
        {/* User Information Section */}
        <div className="w-full bg-surface rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-outline">
                  {currentAvatar !== "/default-avatar.png" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={currentAvatar}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Person className="text-primary text-4xl md:text-5xl" />
                  )}
                </div>

                {/* Upload Button */}
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition-colors"
                  title="Change Avatar"
                >
                  <PhotoCamera className="text-sm" />
                </button>

                {/* Remove Avatar Button */}
                {userData.avatar !== "/default-avatar.png" &&
                  !avatarPreview && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="absolute top-0 right-0 bg-error text-white rounded-full p-1 shadow-lg hover:bg-error/90 transition-colors"
                      title="Remove Avatar"
                    >
                      <Delete className="text-xs" />
                    </button>
                  )}

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Avatar Preview Actions */}
              {avatarPreview && (
                <div className="absolute mt-2 bg-surface rounded-lg shadow-lg p-3 border border-outline z-10">
                  <p className="text-sm text-text mb-3">
                    Preview your new avatar:
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveAvatar}
                      className="bg-success text-white px-3 py-1 rounded text-sm hover:bg-success/90 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelAvatar}
                      className="bg-error text-white px-3 py-1 rounded text-sm hover:bg-error/90 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Information */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                {userData.nickname}
              </h1>
              <p className="text-lg text-text mb-3">{userData.fullName}</p>

              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Email className="text-primary_muted text-lg" />
                <span className="text-text">{userData.email}</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-2">
                <VerifiedUser className="text-primary_muted text-lg" />
                <span
                  className={`font-semibold ${getStatusColor(userData.status)}`}
                >
                  {userData.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="w-full mb-8">
          <div className="flex flex-wrap gap-2 bg-surface rounded-2xl p-2">
            {[
              { id: "account", label: "My Account", icon: Person },
              { id: "settings", label: "Settings", icon: Settings },
              { id: "security", label: "Security", icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-primary_muted hover:text-primary hover:bg-primary/5"
                }`}
              >
                <tab.icon className="text-lg" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {activeTab === "account" && <MyAccount userData={userData} />}
          {activeTab === "settings" && <AccountManagement />}
          {activeTab === "security" && <Security />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
