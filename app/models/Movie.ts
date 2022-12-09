import {Realm} from '@realm/react';


export class Movie extends Realm.Object<Movie> {
  description!: string;
  title!:string;
  releaseyear!: number; 
  userId!: string;
  constructor(realm: Realm, description: string, title:string, releaseyear:number, userId?: string) {
    super(realm, {description, title, releaseyear, userId: userId || '_SYNC_DISABLED_'});
  }  
}