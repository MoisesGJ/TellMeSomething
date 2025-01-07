export default function Modal() {
  return (
    <>
      {/* Fondo oscuro (overlay) */}
      <div className="fixed inset-0 z-40 bg-black/50 blur-lg"></div>

      {/* Modal */}
      <div className="overflow-hidden absolute inset-0 z-50 flex justify-center items-center">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-ee-lg rounded-br-lg shadow-lg relative flex flex-col w-full bg-slate-100 outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                ¡Se ha enviado tu mensaje a <b>Diana</b>!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
