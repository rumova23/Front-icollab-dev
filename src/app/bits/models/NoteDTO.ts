export interface NoteDTO{
    noteId       :number;
    note         :String;
    visible      :Boolean;

    usuario      :String;
    update       :String|Date;
    updateString :String;
}