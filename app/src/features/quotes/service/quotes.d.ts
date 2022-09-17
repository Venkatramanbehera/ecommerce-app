export interface Quote {
    _id: string,
    quoteText: string,
    quoteAuthor: string,
    quoteGenre: string,
    __v: number
}

export interface QuotesIntial {
    quotes: Array<Quote>;
    loading: boolean;
    error: ''
}
