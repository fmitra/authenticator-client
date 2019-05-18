interface AppConfig {
  token: {
    name: string;
  };
  api: {
    baseURL: string;
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
  validUserIdentity: {
    email: true,
    phone: true,
  },
};

export default config;
