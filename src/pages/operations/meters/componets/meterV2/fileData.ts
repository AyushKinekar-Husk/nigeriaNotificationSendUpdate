export interface FileRecord {
  id: string;
  name: string;
  fileName: string;
  status: string;
  date: string;
  SuccessCount: number;
  FailureCount: number;
  TotalRecords: number;
  FileURL: string;
}

export const fetchFileData=[
    {
      id: "1",
      name: "John Doe",
      fileName: "file_upload_1.csv",
      status: "completed",
      date: "2025-06-15",
      SuccessCount: 120,
      FailureCount: 5,
      TotalRecords: 125,
      FileURL: "https://example.com/files/file_upload_1.csv",
    },
    {
      id: "2",
      name: "Jane Smith",
      fileName: "data_batch_2.xlsx",
      status: "processing",
      date: "2025-06-16",
      SuccessCount: 0,
      FailureCount: 0,
      TotalRecords: 300,
      FileURL: "https://example.com/files/data_batch_2.xlsx",
    },
    {
      id: "3",
      name: "Acme Corp",
      fileName: "records_3.json",
      status: "failed",
      date: "2025-06-14",
      SuccessCount: 50,
      FailureCount: 200,
      TotalRecords: 250,
      FileURL: "https://example.com/files/records_3.json",
    },
    {
      id: "4",
      name: "Internal System",
      fileName: "export_summary_4.txt",
      status: "pending",
      date: "2025-06-16",
      SuccessCount: 0,
      FailureCount: 0,
      TotalRecords: 100,
      FileURL: "https://example.com/files/export_summary_4.txt",
    },
  ];
