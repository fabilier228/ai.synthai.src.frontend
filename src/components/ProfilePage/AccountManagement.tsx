import React from "react";
import { Email, Lock, Palette, ExitToApp } from "@mui/icons-material";

const AccountManagement = () => {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-primary mb-6">
          Account Management
        </h2>

        <div className="space-y-4">
          <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline hover:bg-primary/5 transition-colors text-left">
            <Email className="text-primary text-xl" />
            <div>
              <div className="font-semibold text-text">Change Email</div>
              <div className="text-sm text-primary_muted">
                Update your email address
              </div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline hover:bg-primary/5 transition-colors text-left">
            <Lock className="text-primary text-xl" />
            <div>
              <div className="font-semibold text-text">Change Password</div>
              <div className="text-sm text-primary_muted">
                Secure your account with a new password
              </div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline hover:bg-primary/5 transition-colors text-left">
            <Palette className="text-primary text-xl" />
            <div>
              <div className="font-semibold text-text">Change Theme</div>
              <div className="text-sm text-primary_muted">
                Switch between light and dark mode
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-lg p-8">
        <button className="w-full flex items-center gap-4 p-4 rounded-xl border border-error text-error hover:bg-error/5 transition-colors text-left">
          <ExitToApp className="text-xl" />
          <div>
            <div className="font-semibold">Log Out</div>
            <div className="text-sm text-error/70">
              End your session in the application
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
