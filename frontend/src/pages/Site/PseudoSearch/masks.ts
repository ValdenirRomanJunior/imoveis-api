export function  lowercase(e: React.FormEvent<HTMLInputElement>) {

    let value= e.currentTarget.value;
     value.toLowerCase();
  
    e.currentTarget.value = value;
    return e;
     
}