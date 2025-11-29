import { Parser, StatementData } from './types';
import { SchwabParser } from './schwab';

export class ParsingService {
    private parsers: Parser[] = [];

    constructor() {
        this.register(new SchwabParser());
    }

    register(parser: Parser) {
        this.parsers.push(parser);
    }

    async parse(text: string): Promise<StatementData> {
        const parser = this.parsers.find(p => p.canParse(text));
        if (!parser) {
            throw new Error('No suitable parser found for this statement');
        }
        return parser.parse(text);
    }
}
