

const cards = [
    {
        id: 1,
        title: "Searching documentation",
        desc: "Quickly explore technical references to find solutions. Ensure accuracy by reviewing official guides and verified sources."
    },
    {
        id: 2,
        title: "Preparing Proposals",
        desc: "Craft clear, structured proposals that highlight goals. Present ideas with concise language and professional formatting."
    },
    {
        id: 3,
        title: "Searching documentation",
        desc: "Locate relevant examples and best practices efficiently. Save time by focusing on trusted documentation platforms."
    }
]

export default function Problems() {
    return (
        <>
            <div className="bg-transparent mt-36 flex flex-col flex-1 items-center justify-center bg-gray-950 font-sans dark:bg-black">
                <div className="grid grid-cols-2 gap-10 justify-center items-center">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center font-sansSerif text-3xl font-semibold text-white font-normal">Sales teams waste hours searching for information.</h1>

                        <img src="../../think.png" alt="" />
                    </div>

                    <div className="flex flex-col space-y-16 items-center justify-center">
                        {cards.map((card) => (<>
                            <div className={`rounded-2xl max-w-xl ${card.id % 2 === 0 ? "rotate-6" : "rotate-354"} text-white bg-gray-800 shadow-md shadow-white p-4 flex flex-col `} key={card.id}>
                               <h1 className="text-[#00c896] text-2xl" >{card.title} </h1>

                               <h3 className="font-normal text-sm">
                                {card.desc}
                               </h3>
                            </div>
                        </>))}
                    </div>
                </div>
            </div>
        </>
    )
}