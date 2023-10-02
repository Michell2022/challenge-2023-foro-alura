export interface Answer {
    id: number,
    answer: string,
    created_at: string,
    user: {
        id: number,
    }
    topic: {
        id: number,
    }
}
