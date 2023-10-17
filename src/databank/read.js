import { useQuery } from 'react-query';
import axios from 'axios';
import {base, decrypt} from "./config";

export const useTotals = () => {
    return useQuery('totals', async () => {
        const response = await axios.get(`${base}/totals`);
        return response.data;
    })
};

export const useEmployerTotals = () => {
    return useQuery('employer_totals', async () => {
        const response = await axios.post(`${base}/employer/totals`,{}, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
};

export const useEmployerProposals = (page=1, type='recent') => {
    
    let data = new FormData();
    data.append('page', page);
    data.append('type', type);

    return useQuery(`employer_proposals_${page}_${type}`, async () => {
        const response = await axios.post(`${base}/employer/proposals`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};

export const useProposal = (id) => {
    let data = new FormData();
    data.append('id', id);

    return useQuery(`proposal_${id}`, async () => {
        const response = await axios.post(`${base}/proposal`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data
    });
}

export const useEmployerJobs = (page=1, type='recent') => {
    
    let data = new FormData();
    data.append('page', page);
    data.append('type', type);
    return useQuery(`employer_jobs_${page}_${type}`, async () => {
        const response = await axios.post(`${base}/employer/jobs`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};


export const useEmployerJob = (id) => {
    let data = new FormData();
    data.append('id', id);
    return useQuery(`employer_job_${id}`, async () => {
        const response = await axios.post(`${base}/employer/job`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};

export const useSkills = (page=1) => {
    return useQuery(`skills_${page}`, async () => {
        const response = await axios.get(`${base}/skills?page=${page}`);
        return response.data;
    })
};

export const useSkilledPeople = (page = 1, filter='recent', skill='', lat=0, lng=0) => {
    let data = new FormData();
    data.append('page', page);
    data.append('filter', filter);
    data.append('skill', skill);
    data.append('lat', lat);
    data.append('lng', lng);

    return useQuery(`skilledPeople_${page}_${lat}_${lng}_${filter}_${skill}`, async () => {
        const response = await axios.post(`${base}/skilledPeople`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    });
};

export const useSkilledPerson = (id) => {
    let data = new FormData();
    data.append('id', id);

    return useQuery(`skilledPerson_${id}`, async () => {
    const response = await axios.post(`${base}/skilledPerson`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    });
};

export const useSkilledTotals = () => {
    return useQuery('skilled_totals', async () => {
        const response = await axios.post(`${base}/skilled/totals`,{}, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
};

export const useSkilledJobs = (page=1, type='recent') => {
    
    let data = new FormData();
    data.append('page', page);
    data.append('type', type);
    return useQuery(`skilled_jobs_${page}_${type}`, async () => {
        const response = await axios.post(`${base}/skilled/jobs`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};

export const useSkilledProposals = (page=1, type='recent') => {
    
    let data = new FormData();
    data.append('page', page);
    data.append('type', type);

    return useQuery(`skilled_proposals_${page}_${type}`, async () => {
        const response = await axios.post(`${base}/skilled/proposals`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};


export const usePortfolios = (page=1) => {
    
    let data = new FormData();
    data.append('page', page);

    return useQuery(`portfolios_${page}`, async () => {
        const response = await axios.post(`${base}/skilled/portfolios`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
};

export const useSkilledPortfolios = (id, page=1) => {
    let data = new FormData();
    data.append('page', page);
    data.append('id', id);

    return useQuery(`skilled_portfolios_${page}`, async () => {
        const response = await axios.post(`${base}/skilled/portfolios/id`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
}

export const useReviews = (page=1) => {
    let data = new FormData();
    data.append('page', page);

    return useQuery(`portfolios_${page}`, async () => {
        const response = await axios.post(`${base}/skilled/portfolios`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    })
}

export const usePortfolio = (id) => {
    
    let data = new FormData();
    data.append('id', id);


    return useQuery(`portfolio_${id}`, async () => {
        const response = await axios.post(`${base}/skilled/portfolio`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    });

    
};

export const useJobs = (page = 1, filter='recent', skill='', lat=0, lng=0) => {
    let data = new FormData();
    data.append('page', page);
    data.append('filter', filter);
    data.append('skill', skill);
    data.append('lat', lat);
    data.append('lng', lng);

    return useQuery(`jobs_${page}_${lat}_${lng}_${filter}_${skill}`, async () => {
        const response = await axios.post(`${base}/jobs`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    });
};

export const useJob = (id, lat=0, lng=0) => {
    let data = new FormData();

    data.append('id', id);
    data.append('lat', lat);
    data.append('lng', lng);

    return useQuery(`job_${id}_${lat}_${lng}`, async () => {
        const response = await axios.post(`${base}/job`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        // console.log(response.data);
        return response.data;
    });
};

export const getJobs = (recipient) => {
    let data = new FormData();

    data.append('recipient', recipient);

    return axios.post(`${base}/getJobs`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const getCompletableJobs = (recipient) => {
    let data = new FormData();

    data.append('recipient', recipient);

    return axios.post(`${base}/getCompletableJobs`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const jobSkills = async (id) => {
    let data = new FormData();

    data.append('id', id);

    const response = await axios.post(`${base}/jobSkills`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    // console.log(response.data);
    return response.data;
};

export const useSkilledReviews = (id, page=1) => {
    let data = new FormData();
    data.append('id', id);
    data.append('page', page);

    return useQuery('info', async () => {
        const response = await axios.post(`${base}/skilledReviews`, data, {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    })
};

export const useRoles = () => {
    return useQuery('roles', async () => {
        const response = await axios.get(`${base}/roles`);
        return response.data;
    })
};

export const usePlans = () => {
    return useQuery('plans', async () => {
        const response = await axios.get(`${base}/plans`);
        return response.data;
    })
};

export const useInfo = () => {
    return useQuery('info', async () => {
        const response = await axios.post(`${base}/info`, {},  {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
};

export const useChatRecipients = () => {
    return useQuery('chat_recipients', async () => {
        const response = await axios.post(`${base}/chats/recipients`, {},  {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
};

export const useChats = (id) => {
    let data = new FormData();
    data.append('id', id);

    return useQuery(`chats_${id}`, async () => {
        const response = await axios.post(`${base}/chats`, data,  {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    }, {
        refetchInterval: 3000, // Set the polling interval in milliseconds (e.g., 5000 for 5 seconds)
        staleTime: 5000, // Set the stale time in milliseconds (e.g., 10000 for 10 seconds)
      })
};

export const useAppointments = (page=1, filter) => {
    let data = new FormData();
    data.append('page', page);
    data.append('type', filter);

    return useQuery(`user_appointments_${page}_${filter}` , async () => {
        const response = await axios.post(`${base}/appointments`, data,  {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
}

export const useAppointment = (id) => {
    let data = new FormData();
    data.append('id', id);

    return useQuery(`user_appointment_${id}`, async () => {
        const response = await axios.post(`${base}/appointment`, data,  {
            headers: {
                'Authorization': `Bearer ${getItem('token')}`,
            }
        });
        return response.data;
    })
}

export const verfiyCode = (code) => {
    let data = new FormData();
    data.append('code', code);

    return axios.post(`${base}/verifyAccount`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchEmployerJobs = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/employer/jobs/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchSkilledJobs = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/skilled/jobs/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchJobs = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/jobs/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchPerson = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/skilled/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchSkills = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/skills/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchProposals = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/proposals/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const searchPortfolios = (value) => {
    let data = new FormData();
    data.append('value', value);

    return axios.post(`${base}/portfolios/search`, data, {
        headers: {
            'Authorization': `Bearer ${getItem('token')}`,
        }
    });
};

export const confirmPayment = (reference, name, email) => {
    let data = new FormData();
    data.append('reference', reference);
    data.append('name', name);
    data.append('email', email);

    return axios.post(`${base}/confirmPayment`, data);
};

export const login = (data) => {
    return axios.post(`${base}/login`, data);
}

export const getItem = (item) => {
    let value = localStorage.getItem(item);
    if(value) return decrypt(value)

    return value;
};

export const ipInfo = async () => {
    let response = await axios.get('https://api.ipify.org?format=json&callback=?', {
        headers: {
            'Content-Type' : 'application/json'
        }
    });

    let data = await axios.get(`https://ipapi.co/${response.data.ip}/json/`);

    data = data.data;

    return { lat: data.latitude, lng: data.longitude, location: `${data.country_name}, ${data.region}`, ip: data.ip}
}

export default {
    useEmployerJob,
    useEmployerJobs,
    useEmployerTotals,
    useEmployerProposals,
    searchEmployerJobs,
    searchProposals,
    getJobs,
    getCompletableJobs,

    useChatRecipients,
    useChats,

    ipInfo,

    useSkilledTotals,
    useSkilledJobs,
    searchSkilledJobs,
    useSkilledProposals,
    usePortfolios,
    useSkilledPortfolios,
    usePortfolio,
    searchPortfolios,

    useSkilledReviews,
    useAppointments,
    useAppointment,
    useJobs,
    useJob,
    jobSkills,
    searchJobs,
    searchSkills,
    searchPerson,
    useInfo,
    useSkills, 
    useSkilledPeople, 
    useSkilledPerson,
    useTotals, 
    useReviews, 
    useRoles,
    usePlans,
    useProposal,
    confirmPayment,
    login,
    getItem,
    verfiyCode,
}