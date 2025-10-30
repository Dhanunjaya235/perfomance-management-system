

import { Injectable } from "@angular/core";
import {  Pencil ,Trash,X} from "lucide-angular";

@Injectable({
    providedIn: 'root'
})
export class PmsIconsService {
    readonly editIcon=Pencil;
    readonly deleteIcon=Trash;
    readonly closeIcon =X;
}
