import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Note, NoteDocument } from "./schema/note_schema";
import { createNoteDTO } from "./dto/create_note_dto";

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private readonly noteService: Model<NoteDocument>) {}

  async create(noteservice: createNoteDTO) {
    try {
      const noteExist = await this.noteService.findOne({ id: noteservice.userid });
      if (noteExist) {
        throw new HttpException("Note exist", 502);
      } else {
        const newTodo = new this.noteService(noteservice);
        await newTodo.save();
      }
      return "Successful";
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getNotes(): Promise<Note[]> {
    try {
      return this.noteService.find();
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async getUsersNotes(uid: string): Promise<Note[]> {
    try {
      if (!uid || !Types.ObjectId.isValid(uid)) {
        throw new HttpException('Invalid user ID', 400);
      }
      const userId = new Types.ObjectId(uid);
      return await this.noteService.find({ createdby: userId });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async deleteNote(id: string): Promise<string> {
    try {
      const respons = await this.noteService.deleteOne({ _id: id['id'] });
      return "Deleted";
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  // ✅ New: updateNote
  async updateNote(id: string, updateData: Partial<createNoteDTO>): Promise<string> {
    try {
      console.log("Updating notes")
      const noteId = new Types.ObjectId(id);
      const result = await this.noteService.updateOne({ _id: noteId }, { $set: updateData });
      if (result.modifiedCount === 0) {
        throw new HttpException("Note not found or no changes made", 404);
      }
            console.log("Updated")

      return "Updated";
    } catch (error) {
      throw new HttpException(error.message || error, 500);
    }
  }
}
