export default function Modal() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                ¡Se ha enviado tu mensaje a <b>Diana</b>!
              </p>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
