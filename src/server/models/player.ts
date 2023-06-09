import { Schema, model, Types } from "mongoose";
import { IPlayer } from "../../@types/global";

const PlayerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    progress: { type: Number, default: 0 },
    storyline: [{ type: Types.ObjectId, ref: "Storyline" }],
    completedSessions: { type: Number, default: 0 },
    character: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

const Player = model<IPlayer>("Player", PlayerSchema);
export default Player;
