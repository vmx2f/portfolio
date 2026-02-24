import { MdArrowOutward, MdContentCopy } from "react-icons/md";
import GlareHover from "../layout/glare-effect";
import Popover from "../layout/pop-over";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import CopyComponent from "../copy-component";
import { useParams } from "next/navigation";
import { useExtracted } from "next-intl";

export default function Profile() {
    const t = useExtracted('profile')
    const params = useParams();
    const pfpImage = "/images/profile.webp";
    return (
        <section className="w-full h-full ">
            <GlareHover
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="p-8 md:p-10 rounded-sm bg-main/90 w-full flex items-center justify-center"
            >
                <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 animate-swipe-in'>
                    <img
                        className='rounded-full w-40 h-40 md:w-50 md:h-50 border-2 border-theme-color'
                        src={pfpImage}
                        alt="vmx's profile picture"
                    />

                    <div className='mt-6 md:mt-0 md:ml-8 text-center md:text-left'>
                        <h1 className="text-3xl md:text-4xl font-bold text-primary-text">{t("Hi, I'm Jason")}</h1>
                        <p className="mt-3 md:mt-4 text-theme-color">{t("I craft clean, functional, and visually bold interactive experiences, blending design and code to let real-world tools shape digital spaces.")}</p>
                        <div className='flex gap-1 items-center mt-4 justify-center align-middle sm:justify-start sm:align-center'>
                            <Popover
                                trigger={
                                    <a href={`https://github.com/vmx2f`} target="_blank" rel="noopener noreferrer">
                                        <FaGithub className='icon' />
                                    </a>
                                }
                                mode="hover"
                                position="top-center"
                            >
                                {<div className='speech-bubble'>
                                    <MdArrowOutward />
                                    {t("Github")}
                                </div>}
                            </Popover>

                            <Popover
                                trigger={
                                    <a href={`https://x.com/vmx2f`} target="_blank" rel="noopener noreferrer">
                                        <FaXTwitter className='icon' />
                                    </a>
                                }
                                mode="hover"
                                position="top-center"
                            >
                                {<div className='speech-bubble'>
                                    <MdArrowOutward />
                                    Twitter / X
                                </div>}
                            </Popover>

                            <Popover
                                trigger={
                                    <CopyComponent />
                                }
                                mode="hover"
                                position="top-center"
                            >
                                {<div className='speech-bubble'>
                                    <MdContentCopy />
                                    vmx2f@proton.me
                                </div>}
                            </Popover>
                        </div>
                        {/* <a href="https://euxorasoft.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-4 bg-hover/80 p-3 rounded-lg transition-all duration-200 border border-hover/30 border-theme-color/30 cursor-pointer hover:bg-theme-color/10 sm:mr-5 justify-center align-middle sm:justify-start sm:align-center">
                            <EuxoraLogo className="h-10 w-10 text-theme-color" />
                            <div>
                                <h2>{t("Visit my studio!")}</h2>
                                <p className="text-theme-color font-bold">Euxora</p>
                            </div>
                        </a> */}
                    </div>
                </div>

            </GlareHover>
            <div className="flex items-center text-theme-color gap-5 mt-5 align-middle justify-center">
                <a href={`/blog/personal`} className="flex bg-hover/80 p-3 rounded-lg transition-all duration-200 border  border-theme-color/30 cursor-pointer hover:bg-theme-color/10 items-center gap-2">
                    <MdArrowOutward className="inline" />{t("Personal Blog")}
                </a>
                <a href={`/blog/technology`} className="flex bg-hover/80 p-3 rounded-lg transition-all duration-200 border border-theme-color/30 cursor-pointer hover:bg-theme-color/10 items-center gap-2">
                    <MdArrowOutward className="inline" />{t("Tech Blog")}
                </a>
            </div>
        </section>
    )
}