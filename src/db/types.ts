export interface Agent {
  id: number;
  name: string;
  model_type: string;
  status: string;
  created_at: string;
}

export interface Ailment {
  id: number;
  name: string;
  description: string;
}

export interface Therapy {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Appointment {
  id: number;
  agent_id: number;
  therapist_name: string;
  datetime: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface Review {
  id: number;
  agent_id: number;
  author: string;
  body: string;
  approved: number;
  created_at: string;
}
