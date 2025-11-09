"use client"
import { useRouter } from 'next/navigation';
import { date } from 'yup';


export default function AllTranscriptsPage() {
    const router = useRouter();
    const transcripts = [
        { id: "1", name: "Transcript1", date: "2024-06-20" },
        { id: "2", name: "Transcript2", date: "2024-06-18" },
        { id: "3", name: "Transcript3", date: "2024-06-15" },
        { id: "4", name: "Transcript4", date: "2024-06-10" },
        { id: "5", name: "Transcript5", date: "2024-06-05" },
        { id: "6", name: "Transcript6", date: "2024-06-01" },
    ];
    return <div className=" w-full md:w-4/5 pt-4  mx-auto mt-20 md:mt-8 ">
        {transcripts.map((transcript) => (
            <button key={transcript.id} className=" w-full flex gap-2 p-4 mb-4 bg-surface rounded-lg hover:shadow-md transition-shadow duration-200" onClick={() => router.push(`/transcripts/${transcript.id}`)}>
                <div className='flex gap-2'>
                    <h2 className="text-lg font-semibold  ">{transcript.name}</h2>
                    <p className="text-sm text-muted">ID: {transcript.id}</p>
                </div>
                <p className="text-sm text-muted ml-auto">
                    Date: {transcript.date}
                </p>
            </button>
        ))}
    </div>;
}