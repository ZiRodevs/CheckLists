export interface Task {
    description: string;
    date?: Date;
    status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    items?: Item[];
}

export interface Item {
    title: string;
    done?: boolean;
}