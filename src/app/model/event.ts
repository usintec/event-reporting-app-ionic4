//'reporter_name', 'event_name', 'location', 'description', 'user_id'
export class Event {
    constructor(
        public id: string,
        public reporter_name: string,
        public event_name: string,
        public location: string,
        public description: string,
        public user_id: string
    ){
    }
}