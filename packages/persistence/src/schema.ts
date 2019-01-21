import { Document, Schema, Model, model } from "mongoose";
import { Show as ShowInterface } from "@tv-mazing/types";

export interface ShowModel extends ShowInterface, Document {}

export var ShowSchema: Schema = new Schema({
  tvMazeId: Number,
  name: String,
  cast: [{ tvMazeId: Number, name: String, birthday: Date }]
});

export const Show: Model<ShowModel> = model<ShowModel>("Show", ShowSchema);
