import React from "react";
import type { MyAccountProps } from "./interfaces";

const MyAccount = ({ userData }: MyAccountProps) => {
  return (
    <div className="bg-surface rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-bold text-primary mb-6">My Account</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-text mb-2">
            Registration Date
          </label>
          <p className="text-primary_muted">{userData.registrationDate}</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text mb-2">
            Last Login
          </label>
          <p className="text-primary_muted">{userData.lastLogin}</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
