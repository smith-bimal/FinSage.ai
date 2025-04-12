import { FNGLabels, FNGSvg } from './FNGComponents';

const FNG = () => {
    return (
        <>
            {/* ----------Heading---------- */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Fear & Greed Index</h1>
            </div>

            <div className="h-full flex flex-col items-center justify-evenly">
                <div>
                    <FNGSvg />
                </div>
                <FNGLabels />
            </div>
        </>
    )
}

export default FNG;