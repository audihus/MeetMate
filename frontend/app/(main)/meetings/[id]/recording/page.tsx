import React from "react";

interface MeetingRecordingPageProps {
  params: {
    id: string;
  };
}

export default function MeetingRecordingPage({ params }: MeetingRecordingPageProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Meeting Recording Placeholder for ID: {params.id}</h1>
    </div>
  );
}
