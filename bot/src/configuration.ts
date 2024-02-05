interface Configuration {
    token: string;
    client_id: string;
    language: string;
    allowed_channels: string[];
}

import configuration from './configuration.json';
export default configuration as Configuration;
