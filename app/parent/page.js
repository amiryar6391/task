
"use client";

import Child from "@/components/child";



export default function Parent(){
    let handleClick
    
    return(
        <div>
           <Child setHandleClick={(fn) => (handleClick = fn)} />
            <div>
                <button onClick={() => handleClick()}>click me</button>
            </div>

        </div>
    )
}

// let handleClick; // متغیر خالی

// // فلش فانکشن برای مقداردهی
// const setFunction = (fn) => {
//     handleClick = fn; // مقدار fn به handleClick اختصاص داده می‌شود
// };

// // یک تابع دلخواه
// const myFunction = () => {
//     console.log("Hello!");
// };

// // مقداردهی handleClick
// setFunction(myFunction);

// // حالا می‌توان از handleClick استفاده کرد
// handleClick();