import { useState } from 'react';

interface MyMemoriesProps {
  language?: string;
}

type TabType = 'people' | 'time' | 'event' | 'data';

const MyMemories = ({ language = 'en' }: MyMemoriesProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('people');
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);

  // Sync tab state with URL on mount and when URL changes

  // Separate CSV data for each tab
  const [peopleCsvData, setPeopleCsvData] = useState<any[]>([]);
  const [peopleCsvHeaders, setPeopleCsvHeaders] = useState<string[]>([]);

  const [timeCsvData, setTimeCsvData] = useState<any[]>([]);
  const [timeCsvHeaders, setTimeCsvHeaders] = useState<string[]>([]);

  const [eventCsvData, setEventCsvData] = useState<any[]>([]);
  const [eventCsvHeaders, setEventCsvHeaders] = useState<string[]>([]);

  // Transform face groups to match the existing Person format

  const texts = {
    en: {
      title: 'My Memories',
      subtitle: 'Explore your photos organized by people, time, and events',
      tabPeople: 'By People',
      tabTime: 'By Time',
      tabEvent: 'By Event',
      tabData: 'Data',
      uploadPeople:
        'Upload CSV with face groups (columns: person_name, photo_id, etc.)',
      uploadTime:
        'Upload CSV with timeline data (columns: decade, year, photo_id, etc.)',
      uploadEvent:
        'Upload CSV with event data (columns: event_type, event_name, photo_id, etc.)',
      noDataPeople: 'Upload a CSV file to see face groupings',
      noDataTime: 'Upload a CSV file to explore your timeline',
      noDataEvent: 'Upload a CSV file to browse events',
      groups: 'Groups',
      photos: 'photos',
    },
    zh: {
      title: '我的记忆',
      subtitle: '按人物、时间和事件探索您的照片',
      tabPeople: '按人物',
      tabTime: '按时间',
      tabEvent: '按事件',
      tabData: '数据',
      uploadPeople: '上传包含人物分组的 CSV（列：person_name、photo_id 等）',
      uploadTime: '上传包含时间线数据的 CSV（列：decade、year、photo_id 等）',
      uploadEvent:
        '上传包含事件数据的 CSV（列：event_type、event_name、photo_id 等）',
      noDataPeople: '上传 CSV 文件以查看人物分组',
      noDataTime: '上传 CSV 文件以探索时间线',
      noDataEvent: '上传 CSV 文件以浏览事件',
      groups: '分组',
      photos: '张照片',
    },
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const handlePeopleDataLoaded = (data: any[], headers: string[]) => {
    setPeopleCsvData(data);
    setPeopleCsvHeaders(headers);
  };

  const handleTimeDataLoaded = (data: any[], headers: string[]) => {
    setTimeCsvData(data);
    setTimeCsvHeaders(headers);
  };

  const handleEventDataLoaded = (data: any[], headers: string[]) => {
    setEventCsvData(data);
    setEventCsvHeaders(headers);
  };

  // Group people data
  const groupedByPerson = peopleCsvData.reduce((acc, row) => {
    const person = row.person_name || row.name || 'Unknown';
    if (!acc[person]) {
      acc[person] = [];
    }
    acc[person].push(row);
    return acc;
  }, {} as Record<string, any[]>);

  const personGroups = Object.entries(groupedByPerson).sort((a, b) =>
    a[0].localeCompare(b[0])
  ) as [string, any[]][];

  // Group time data by decade
  const groupedByDecade = timeCsvData.reduce((acc, row) => {
    const decade = row.decade || row.estimated_decade || 'Unknown';
    if (!acc[decade]) {
      acc[decade] = [];
    }
    acc[decade].push(row);
    return acc;
  }, {} as Record<string, any[]>);

  const decadeGroups = Object.entries(groupedByDecade).sort((a, b) =>
    a[0].localeCompare(b[0])
  ) as [string, any[]][];

  // Group event data by event type
  const groupedByEvent = eventCsvData.reduce((acc, row) => {
    const event = row.event_type || row.event || 'Unknown';
    if (!acc[event]) {
      acc[event] = [];
    }
    acc[event].push(row);
    return acc;
  }, {} as Record<string, any[]>);

  const eventGroups = Object.entries(groupedByEvent).sort((a, b) =>
    a[0].localeCompare(b[0])
  ) as [string, any[]][];

  // Sample CSV download functions
  const downloadSamplePeopleCSV = () => {
    const sampleData = [
      ['person_name', 'photo_id'],
      ['Alice Chen', '09288209-6e1b-495a-b640-5647a57e3e37'],
      ['Alice Chen', 'b646b4f4-86ac-4001-91c7-1529e9cf7a38'],
      ['Alice Chen', '2d687f9d-804b-4b62-9b4b-37890cab6a78'],
      ['Bob Wong', '79b8ae03-deb8-4b0a-9a73-ffdccd44ebb7'],
      ['Bob Wong', 'fbcf5fad-38f3-4ec7-848d-e494db8324d3'],
      ['Carol Lee', '85a6057e-20ee-4bea-8010-967d0f4df6c7'],
      ['Carol Lee', '03e241b4-bd31-4000-9eaf-51c99205c5ed'],
      ['Carol Lee', 'b91eecb3-eec7-43ea-86c7-665bb51997fb'],
      ['Carol Lee', '78aaa40a-3114-4f18-bbb9-e1c00f260353'],
      ['David Zhang', '4c36c681-b578-4b98-b21c-49823715457b'],
      ['David Zhang', '46049044-2c68-4d24-897f-465814b02cd0'],
      ['Emma Liu', 'c350dfc5-94f1-42ce-a020-1c171302b1aa'],
      ['Emma Liu', 'aae9d09c-d66a-420b-aed5-aec6115c9b13'],
      ['Emma Liu', '6506fc92-adf1-4a83-9bf5-d7eab92b1143'],
    ];

    const csv = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sample-face-groups-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadSampleTimeCSV = () => {
    const sampleData = [
      ['decade', 'year', 'photo_id'],
      ['1990s', '1994', '09288209-6e1b-495a-b640-5647a57e3e37'],
      ['1990s', '1995', 'b646b4f4-86ac-4001-91c7-1529e9cf7a38'],
      ['1990s', '1998', '2d687f9d-804b-4b62-9b4b-37890cab6a78'],
      ['2000s', '2001', '79b8ae03-deb8-4b0a-9a73-ffdccd44ebb7'],
      ['2000s', '2005', 'fbcf5fad-38f3-4ec7-848d-e494db8324d3'],
      ['2010s', '2012', '85a6057e-20ee-4bea-8010-967d0f4df6c7'],
      ['2010s', '2015', '03e241b4-bd31-4000-9eaf-51c99205c5ed'],
      ['2020s', '2020', 'b91eecb3-eec7-43ea-86c7-665bb51997fb'],
      ['2020s', '2023', '78aaa40a-3114-4f18-bbb9-e1c00f260353'],
    ];

    const csv = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sample-timeline-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadSampleEventCSV = () => {
    const sampleData = [
      ['event_type', 'event_name', 'location', 'photo_id'],
      [
        'Wedding',
        'Alice & Bob Wedding',
        'Hong Kong',
        '09288209-6e1b-495a-b640-5647a57e3e37',
      ],
      [
        'Wedding',
        'Alice & Bob Wedding',
        'Hong Kong',
        'b646b4f4-86ac-4001-91c7-1529e9cf7a38',
      ],
      [
        'Birthday',
        '30th Birthday Party',
        'Kowloon',
        '2d687f9d-804b-4b62-9b4b-37890cab6a78',
      ],
      [
        'Birthday',
        '30th Birthday Party',
        'Kowloon',
        '79b8ae03-deb8-4b0a-9a73-ffdccd44ebb7',
      ],
      [
        'Vacation',
        'Japan Trip',
        'Tokyo',
        'fbcf5fad-38f3-4ec7-848d-e494db8324d3',
      ],
      [
        'Vacation',
        'Japan Trip',
        'Kyoto',
        '85a6057e-20ee-4bea-8010-967d0f4df6c7',
      ],
      [
        'Family',
        'Chinese New Year',
        'Home',
        '03e241b4-bd31-4000-9eaf-51c99205c5ed',
      ],
      [
        'Family',
        'Chinese New Year',
        'Home',
        'b91eecb3-eec7-43ea-86c7-665bb51997fb',
      ],
      [
        'Graduation',
        'University Graduation',
        'CUHK',
        '78aaa40a-3114-4f18-bbb9-e1c00f260353',
      ],
    ];

    const csv = sampleData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sample-events-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'people' as TabType, label: t.tabPeople, icon: '' },
    { id: 'time' as TabType, label: t.tabTime, icon: 'Calendar' },
    { id: 'event' as TabType, label: t.tabEvent, icon: 'Tag' },
    { id: 'data' as TabType, label: t.tabData, icon: 'Database' },
  ];

  return (
    <div className='min-h-screen bg-background overflow-x-hidden'>
      {/* Main Content */}
      <div className='container mx-auto px-6 py-12'>
        {/* Tabs */}
        <div className='flex gap-4 border-b border-border mb-8'>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                data-testid={`tab-${tab.id}`}
              >
                {/* <Icon size={18} /> */}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyMemories;
