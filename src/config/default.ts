interface AppConfig {
  token: {
    name: string;
  };
  api: {
    baseURL: string;
  };
  password: {
    minLength: number;
  };
  validUserIdentity: {
    email: boolean;
    phone: boolean;
  };
}

const config: AppConfig = {
  token: {
    name: 'jwt-token',
  },
  api: {
    baseURL: 'https://api.authenticator.local',
  },
  password: {
    minLength: 8,
  },
  validUserIdentity: {
    email: true,
    phone: true,
  },
};

export default config;
