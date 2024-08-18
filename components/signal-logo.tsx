import { cn } from "@/lib/utils";

export default function SignalLogo({className}:{className:string}) {
    return (
        <svg className={cn('w-64 h-64',className)} viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <g>
                <path d="M97.2800192,3.739673 L100.160021,15.3787704 C88.8306631,18.1647705 77.9879854,22.6484879 68.0000023,28.6777391 L61.8399988,18.3985363 C72.8467373,11.7537029 84.7951803,6.81153332 97.2800192,3.739673 Z M158.720055,3.739673 L155.840053,15.3787704 C167.169411,18.1647705 178.012089,22.6484879 188.000072,28.6777391 L194.200075,18.3985363 C183.180932,11.7499974 171.218739,6.80771878 158.720055,3.739673 L158.720055,3.739673 Z M18.3999736,61.8351679 C11.7546212,72.8410466 6.81206547,84.7885562 3.73996516,97.2724198 L15.3799719,100.152197 C18.1661896,88.8237238 22.6502573,77.981893 28.6799796,67.9946902 L18.3999736,61.8351679 Z M11.9999699,127.990038 C11.9961044,122.172725 12.4306685,116.363392 13.2999707,110.611385 L1.43996383,108.811525 C-0.479938607,121.525138 -0.479938607,134.454937 1.43996383,147.168551 L13.2999707,145.36869 C12.4306685,139.616684 11.9961044,133.807351 11.9999699,127.990038 L11.9999699,127.990038 Z M194.160075,237.581539 L188.000072,227.302336 C178.024494,233.327885 167.195565,237.811494 155.880053,240.601305 L158.760055,252.240403 C171.231048,249.164732 183.165742,244.222671 194.160075,237.581539 L194.160075,237.581539 Z M244.000104,127.990038 C244.00397,133.807351 243.569406,139.616684 242.700103,145.36869 L254.56011,147.168551 C256.480013,134.454937 256.480013,121.525138 254.56011,108.811525 L242.700103,110.611385 C243.569406,116.363392 244.00397,122.172725 244.000104,127.990038 Z M252.260109,158.707656 L240.620102,155.827879 C237.833884,167.156352 233.349817,177.998183 227.320094,187.985385 L237.6001,194.184905 C244.249159,183.166622 249.191823,171.205364 252.260109,158.707656 L252.260109,158.707656 Z M145.380047,242.701142 C133.858209,244.43447 122.141865,244.43447 110.620027,242.701142 L108.820026,254.560223 C121.534632,256.479975 134.465442,256.479975 147.180048,254.560223 L145.380047,242.701142 Z M221.380091,196.804701 C214.461479,206.174141 206.175877,214.452354 196.800077,221.362797 L203.920081,231.022048 C214.262958,223.418011 223.404944,214.303705 231.040097,203.984145 L221.380091,196.804701 Z M196.800077,34.6172785 C206.177345,41.5338058 214.463023,49.8188367 221.380091,59.1953726 L231.040097,51.9959309 C223.429284,41.6822474 214.31457,32.5682452 204.000081,24.9580276 L196.800077,34.6172785 Z M34.619983,59.1953726 C41.5370506,49.8188367 49.8227288,41.5338058 59.1999972,34.6172785 L51.9999931,24.9580276 C41.6855038,32.5682452 32.5707896,41.6822474 24.9599774,51.9959309 L34.619983,59.1953726 Z M237.6001,61.8351679 L227.320094,67.9946902 C233.346114,77.969489 237.830073,88.7975718 240.620102,100.1122 L252.260109,97.2324229 C249.184198,84.7624043 244.241751,72.8286423 237.6001,61.8351679 L237.6001,61.8351679 Z M110.620027,13.2989317 C122.141865,11.5656035 133.858209,11.5656035 145.380047,13.2989317 L147.180048,1.43985134 C134.465442,-0.479901112 121.534632,-0.479901112 108.820026,1.43985134 L110.620027,13.2989317 Z M40.7799866,234.201801 L15.9999722,239.981353 L21.7799756,215.203275 L10.0999688,212.463487 L4.3199655,237.241566 C3.3734444,241.28318 4.58320332,245.526897 7.51859925,248.462064 C10.4539952,251.39723 14.6980441,252.606895 18.7399738,251.660448 L43.4999881,245.980888 L40.7799866,234.201801 Z M12.5999703,201.764317 L24.279977,204.484106 L28.2799793,187.305438 C22.4496684,177.507146 18.1025197,166.899584 15.3799719,155.827879 L3.73996516,158.707656 C6.34937618,169.311891 10.3154147,179.535405 15.539972,189.125297 L12.5999703,201.764317 Z M68.6000027,227.762301 L51.4199927,231.761991 L54.1399943,243.441085 L66.7800016,240.501313 C76.3706428,245.725462 86.5949557,249.691191 97.2000192,252.300398 L100.080021,240.6613 C89.0307035,237.906432 78.4495684,233.532789 68.6800027,227.682307 L68.6000027,227.762301 Z M128.000037,23.9980665 C90.1565244,24.0177003 55.3105242,44.590631 37.01511,77.715217 C18.7196958,110.839803 19.8628631,151.287212 39.9999861,183.325747 L29.9999803,225.982439 L72.660005,215.983214 C110.077932,239.548522 158.307237,236.876754 192.892851,209.322653 C227.478464,181.768552 240.856271,135.358391 226.242944,93.6248278 C211.629616,51.8912646 172.221191,23.9617202 128.000037,23.9980665 Z" fill="#3A76F0"></path>
            </g>
        </svg>
    )
}