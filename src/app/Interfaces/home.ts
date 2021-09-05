export interface IHome {
    id: number;
    smallTitle: string;
    bigTitle1: string;
    bigTitle2: string;
}

export interface IHomeSection3 {
    smallTitle: string;
    bigTitle1: string;
    bigTitle2: string;
    details: string;
    id: number;
    gloriousYears: number;
    projectsDone: number;
    teamAdvisors: number;
    activeClients: number;
}

export interface IHomeSection5 {
    id: number;
    smallTitle: string;
    bigTitle1: string;
    bigTitle2: string;
    details: string;
}

export interface IHomeCard {
    id: number;
    cardTitle: string;
    cardDetails: string;
    cardFooter1: string;
    cardFooter2: string;
    cardFooter3: string;
}

export interface IHomeSlider {
    id: number;
    bigTitle: string;
    details: string;
    smallTitle: string;
}