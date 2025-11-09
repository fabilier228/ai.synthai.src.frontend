import React from "react";

const Security = () => {
  return (
    <div className="bg-surface rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-bold text-primary mb-6">Security</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-text mb-2">Active Sessions</h3>
          <div className="bg-white/50 rounded-xl p-4 border border-outline">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-text">Current Session</p>
                <p className="text-sm text-primary_muted">
                  Windows · Chrome · New York
                </p>
              </div>
              <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-lg">
                Active
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-text mb-2">
            Two-Factor Authentication
          </h3>
          <div className="bg-white/50 rounded-xl p-4 border border-outline">
            <p className="text-primary_muted mb-3">
              Enhance your account security
            </p>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
