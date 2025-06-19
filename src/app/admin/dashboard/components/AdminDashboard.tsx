"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, Calendar, TrendingUp, UserX } from "lucide-react";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8 bg-muted/50 overflow-y-auto">
        {/* Header */}
        {/* <div className="mb-6 items-center text-center">
          <h1 className="text-2xl md:text-2xl font-bold tracking-tight">
            Palanit Church
          </h1>
          <p className="text-sm text-muted-foreground">
            You are managing the Palanit Church admin dashboard.
          </p>
        </div> */}

        {/* Stats Grid Placeholder */}
        <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Replace with actual stat cards */}
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              Stats section (coming soon)
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-7">
          {/* Member Growth Overview */}
          <Card className="col-span-7 lg:col-span-4">
            <CardHeader>
              <CardTitle>Member Growth Overview</CardTitle>
              <CardDescription>
                Monthly member registration and activity trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* <OverviewChart /> */}
              <div className="text-muted-foreground text-sm">
                Chart Placeholder
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="col-span-7 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <RecentActivity /> */}
              <div className="text-muted-foreground text-sm">
                Activity Placeholder
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Notifications */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-600" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Alert: Pending Approvals */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-yellow-200 p-1">
                    <UserX className="h-4 w-4 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800">
                      Pending Approvals
                    </h4>
                    <p className="text-sm text-yellow-700">
                      23 member applications awaiting review
                    </p>
                    <button className="mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900">
                      Review Applications →
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert: Monthly Report */}
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-200 p-1">
                    <TrendingUp className="h-4 w-4 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Monthly Report Ready
                    </h4>
                    <p className="text-sm text-blue-700">
                      October membership report is available
                    </p>
                    <button className="mt-2 text-sm font-medium text-blue-800 hover:text-blue-900">
                      Download Report →
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert: Upcoming Events */}
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-200 p-1">
                    <Calendar className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800">
                      Upcoming Events
                    </h4>
                    <p className="text-sm text-green-700">
                      12 events scheduled for next month
                    </p>
                    <button className="mt-2 text-sm font-medium text-green-800 hover:text-green-900">
                      Manage Events →
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
