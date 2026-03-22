import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

type Status = "Silver" | "Gold" | "Black";
type Code = "1" | "2" | "3";
export type Benefit = {
  name: string;
  value: string;
  description: string;
  amount_in_rubles: number;
};

interface User {
  data: {
    dealer_code: number;
    dealer_name: string;
    dealer_region: string;
    email: string;
    first_name: string;
    job_position: string;
    last_name: string;
    middle_name: string;
    phone: string;
    program_started_at: string;
    user_id: number;
  };
}

interface Rating {
  data: {
    benefits: string[];
    level: {
      code: Code;
      description: string;
      name: Status;
    };
    rating: {
      next_level_name: Omit<Status, "silver">;
      points_to_next_level: number;
      progress_percent: number;
      total_points: number;
    };
  };
}

interface Details {
  data: {
    add_products: number;
    bank_portion_of_deals: number;
    count_of_deals: number;
    volume_of_sales: number;
  };
}

interface Benefits {
  data: {
    level_code: number;
    level_id: number;
    benefits: Benefit[];
  }[];
}

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(token: string | null) {
    this.axiosInstance = axios.create({
      baseURL: "http://212.192.193.88:8080/api/v1",
    });

    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  async getUser(): Promise<User> {
    const { data } = await this.axiosInstance.get<User>("/profile");
    return data;
  }

  async getRating(): Promise<Rating> {
    const { data } = await this.axiosInstance.get<Rating>("/dashboards");
    return data;
  }

  async getDetails(): Promise<Details> {
    const { data } = await this.axiosInstance.get<Details>("/rating/details");
    return data;
  }

  async getBenefits(): Promise<Benefits> {
    const { data } = await this.axiosInstance.get<Benefits>("/benefits");
    return data;
  }
}
