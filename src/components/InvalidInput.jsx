import { createPortal } from 'react-dom';

export default function InvalidInput({ ref }) {
    return createPortal(<dialog ref={ref} className="rounded-[5px] backdrop:bg-black/80 bg-[rgba(33,32,32,255)]">
        <div className=" h-[13rem] w-[30rem]">
            <h1 className="font-bold text-[#ffffff] text-xl pt-5 pl-5">Invalid Input</h1>
            <p className="mt-5 ml-5 text-[#ffffff]">You forgot to enter a value.</p>
            <p className="mt-5 ml-5 text-[#ffffff]">Make sure you provide a valid value for every input field.</p>
            <form method="dialog" className="flex justify-end">
                <button className="text-[#ffffff] bg-[#45413c] px-3 py-2 rounded-[8px] mx-7 mt-3">Okay</button>
            </form>
        </div>
    </dialog>, document.getElementById('root'))
}