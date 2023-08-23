interface InputData {
    name:string;
    autosave?(data:object):void;
    onChange?(data:any):void;
    label?:string;
  }
export default InputData  