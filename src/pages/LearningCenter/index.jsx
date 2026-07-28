import React from 'react';
import MainLayout from '../../components/layout/MainLayout';

export default function LearningCenter() {
  return (
    <MainLayout>
      <div className="pt-12 pb-20 max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-12">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-2">Learning Center</h1>
          <p className="text-on-surface-variant font-body-lg max-w-2xl">Precision engineering starts here. Explore our curated courses from basic circuitry to advanced FPGA architecture.</p>
          <div className="mt-8 lg:hidden">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full bg-surface-container-low border border-outline-variant rounded px-10 py-3 focus:ring-0 focus:border-primary transition-all font-body-md" placeholder="Find a specific tutorial..." type="text" />
            </div>
          </div>
        </div>

        <section className="mb-16">
          <div className="relative overflow-hidden rounded-xl bg-inverse-surface text-on-primary-container p-1 md:p-2 border border-outline-variant">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg p-8 md:p-12">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-white font-code-label mb-6">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  COURSE OF THE MONTH
                </div>
                <h2 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-background mb-4">Advanced Logic Control with Microcontrollers</h2>
                <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">
                  Dive deep into real-time operating systems and hardware-level optimization. This month, we're focusing on the STM32 architecture and how to build deterministic systems for high-precision manufacturing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 bg-primary-container text-white font-bold hover:bg-primary transition-colors flex items-center gap-2 group">
                    Start Learning
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                  <button className="px-8 py-3 border border-outline font-medium hover:bg-surface-container transition-colors">
                    View Curriculum
                  </button>
                </div>
              </div>
              <div className="order-1 md:order-2 relative aspect-video rounded-lg overflow-hidden group">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A macro studio photograph of a complex blue printed circuit board with glowing copper traces and integrated circuits. High-tech laboratory lighting creates sharp reflections on the solder points and silk-screen markings. The aesthetic is professional, technical, and clean with a focus on electronic precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuADVES69I9EVB-OL2yra-hJDfKDKf_C_7OqCnUWHx2imqNgiV9paGrnKsyZXryQdttZ-ErsYgvAY54MHSeZern5VejjNwRYRpUbunQLNzx0hNQHbILDIkuEz32Rk3ODjzUz7zGlKIY_4L6Do89JC6ZKE529m1LVgsALyuiNShzL62l077l7pE0MK42luBkxoibBl1sMLlQalQf-Vn0G71ao2ViyTATBk9kk40P0zVilo8-Adgx2EVzhnPtRX3Av477z5Qyo_gmYVS56" />
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded border border-outline-variant flex items-center gap-2 font-code-label text-primary">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                  12.5 Hours
                </div>
              </div>
            </div>
            <div className="absolute inset-0 circuit-pattern opacity-5 pointer-events-none"></div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="font-headline-md text-on-background">Explore Pathways</h3>
              <p className="text-on-surface-variant font-body-md">Guided tracks to master your craft</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="md:col-span-1 group cursor-pointer h-full border border-outline-variant bg-surface-container-lowest p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h4 className="font-title-sm text-on-background mb-2">Basics</h4>
              <p className="text-on-surface-variant font-caption text-caption mb-6">Fundamental electronic principles, Ohm's law, and component identification.</p>
              <div className="font-code-label text-primary flex items-center gap-2">
                <span className="">24 TUTORIALS</span>
                <div className="h-px flex-1 bg-outline-variant group-hover:bg-primary transition-colors"></div>
              </div>
            </div>

            <div className="md:col-span-1 group cursor-pointer h-full border border-outline-variant bg-surface-container-lowest p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">precision_manufacturing</span>
              </div>
              <h4 className="font-title-sm text-on-background mb-2">Advanced Theory</h4>
              <p className="text-on-surface-variant font-caption text-caption mb-6">Signal processing, digital logic design, and power management circuits.</p>
              <div className="font-code-label text-primary flex items-center gap-2">
                <span className="">18 TUTORIALS</span>
                <div className="h-px flex-1 bg-outline-variant group-hover:bg-primary transition-colors"></div>
              </div>
            </div>

            <div className="md:col-span-1 group cursor-pointer h-full border border-outline-variant bg-surface-container-lowest p-6 hover:border-primary transition-all">
              <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">construction</span>
              </div>
              <h4 className="font-title-sm text-on-background mb-2">Project Guides</h4>
              <p className="text-on-surface-variant font-caption text-caption mb-6">Step-by-step builds from IoT sensors to custom guitar pedal circuits.</p>
              <div className="font-code-label text-primary flex items-center gap-2">
                <span className="">32 TUTORIALS</span>
                <div className="h-px flex-1 bg-outline-variant group-hover:bg-primary transition-colors"></div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-headline-md text-on-background">Latest Tutorials</h3>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors material-symbols-outlined">filter_list</button>
              <button className="p-2 border border-outline-variant rounded hover:bg-surface-container transition-colors material-symbols-outlined">sort</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="flex flex-col group border border-outline-variant bg-surface-container-lowest">
              <div className="relative aspect-video overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A top-down view of an engineer's workbench with an oscilloscope, a soldering iron emitting a faint wisp of smoke, and various resistors spread across a green cutting mat. The lighting is focused and warm, emphasizing the meticulous nature of electrical engineering work in a modern workshop setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI49AjBhOxVjfJh4KsAFBoWB_U9EkMRvySyGwG23c11XJp_3c-ms74h85bXigtuA5TfIo4p2_T4WBqCXsF3XyDoOC_kqyXCC_1nyu9s_cKADyvFMb6ZesE25vaXlRK3k_upBvrpa0Dz_mitfEfvWzdaL7HxXuiExiGiGOEdqR8I__dEUj5Dl6wllYYEnrRcnVXVufBwlp7xYI44UZ-1cH0TBLsio4gtNOtndw3PyJMmtHaUDSKfvkMySVDf2bvwfhMFNrNeWqeTFFq" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white font-code-label text-[10px]">14:22</div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex gap-2 mb-2">
                  <span className="font-code-label text-[10px] text-primary bg-primary-fixed px-1.5 py-0.5">BASICS</span>
                </div>
                <h5 className="font-title-sm text-[16px] leading-snug mb-2 group-hover:text-primary transition-colors">Understanding Solderless Breadboards</h5>
                <p className="text-on-surface-variant text-caption line-clamp-2 mb-4">Learn the internal connections of a standard breadboard and how to prototype efficiently.</p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
                      <img className="w-full h-full object-cover" data-alt="A professional headshot of a female electronics engineer with glasses, looking friendly and knowledgeable. The background is a blurred engineering lab with blurred tech equipment. High-quality corporate portrait photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtYif0N3dJQ1AoNI3XWmKc82E6btVWIQC4D6gaRR3bZqf8msRnqe-nm5nKMN-Y07_3BiSrf-KPToy2E5tjyK303mW3X-rWE8gmd8ytwo5x23We-47AidWTTWdIgaR0w7HxSLjVb-LELptDL38qmnGmNiO21nYgfaDBxsM_DaHLeyltpQ_h-rFt2EUSbt95bCYjBK2ch4Klt_K1x1YLosopJtzBq0mBZiuWmGL1ostaCEOg-Z3mI2QBi_YQ5wTYdFD9maLiMxmxNdWM" />
                    </div>
                    <span className="font-caption text-on-surface-variant">Sarah Jenkins</span>
                  </div>
                  <span className="font-caption text-outline">2d ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col group border border-outline-variant bg-surface-container-lowest">
              <div className="relative aspect-video overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Close up of a blue microcontroller board with glowing LEDs. The focus is sharp on the microchip center, with a shallow depth of field blurring the background components. Neon blue and white lighting highlights the technical precision and futuristic energy of high-end maker components." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxxyZLGyA09fes6Q7LstCZRViL5xtg2W2lBLq86gmo5lJyCJiQCTZH_EKZ-skHSyw2f3PFBQzjvqgKAspUid-b3UtSBSst1r_xbG3WDjWpHwDOhOMwX5bPsf2xzD3n3x7JrESPD0aHs7fMpAhGbh6Fw1_7sJjATs-lMN8lXCE_Z_cxG0StcdnV2ogLghgijqueVDiUxnKnBPVbPwfC2XSVFfxezbD43YBgTQUIrAgWt83nJWiNP-pEMgQ6npY4OlUq_kPzfJyRF6Mj" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white font-code-label text-[10px]">28:05</div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex gap-2 mb-2">
                  <span className="font-code-label text-[10px] text-on-tertiary-fixed-variant bg-tertiary-fixed px-1.5 py-0.5">ADVANCED</span>
                </div>
                <h5 className="font-title-sm text-[16px] leading-snug mb-2 group-hover:text-primary transition-colors">Interfacing High-Speed ADCs</h5>
                <p className="text-on-surface-variant text-caption line-clamp-2 mb-4">How to handle high-frequency analog signals and convert them without data loss.</p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
                      <img className="w-full h-full object-cover" data-alt="A portrait of a male technical instructor with a short beard, wearing a professional gray polo shirt. He has a welcoming expression. The lighting is soft and even, characteristic of a professional educational setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHD8nNoRX9iOrRkrmf9Cwtfk4LBTu5mNkTpx0HX8FR_Lmcor_fXzvps3IzR_BWlwCNEhH8AuUlGT7i1nAduFcq1oOvRAL_nl2rvdzas8laHEYZgyDN9Zf1J5MFvrQoz-w10LNn6wfDfk9vufWL26XtWCqNwR3VCgW__-vrfq25usALMiKx_fCSOOX8uXSQ2WrlidYMSDZlAYNJyqDuPFOdqCdgiyDVOXRmiEfOuv4A5b3QjegTK-n8H4-zuWjRireYB0iWqFXxXRD7" />
                    </div>
                    <span className="font-caption text-on-surface-variant">Dr. Marc Thompson</span>
                  </div>
                  <span className="font-caption text-outline">5d ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col group border border-outline-variant bg-surface-container-lowest">
              <div className="relative aspect-video overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A wide-angle shot of a custom-built DIY drone on a workbench. The drone's carbon fiber frame and intricate wiring are visible. Surrounding it are tools like hex keys and a digital multimeter. The environment is a clean, organized garage workshop with natural light filtering through a window." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC93TgTQayHQbTYRoV9-gOIWr54CJeC3BxU_vSLGY8Vzi04CEZ0m8CSSsjOgZWrO3hpGlFWbCwvum_Z_fuzax59-7adQwkMkmuwns9AhzyTcavxFXE8ar38hYE5L4nVchL6LfFVzuSmHczKgXD4i1Imr4uXrsOPOU_XiiKHZPX9s6LZILjkPDzvptWDm-ASd8VXMhNdTPpeMWlYpDuDRErNCUxbaOkGSKNimrE0XuInG6yKqVnUf_oxqIOpBo5RWJDQ7QdlbhRf84fc" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white font-code-label text-[10px]">45:10</div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex gap-2 mb-2">
                  <span className="font-code-label text-[10px] text-on-secondary-fixed-variant bg-secondary-fixed px-1.5 py-0.5">PROJECTS</span>
                </div>
                <h5 className="font-title-sm text-[16px] leading-snug mb-2 group-hover:text-primary transition-colors">Building a Custom Flight Controller</h5>
                <p className="text-on-surface-variant text-caption line-clamp-2 mb-4">Complete project guide on designing PCB layouts for drone flight controllers.</p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
                      <img className="w-full h-full object-cover" data-alt="A modern portrait of a young male maker in his early 20s, wearing a t-shirt with a technical logo. He has an enthusiastic look. The background is slightly out of focus, showing 3D printers and spools of filament." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSwxw75KLen3XI4_Aj9lG31bG41B9EMOwwcr_ZylXlD0agbdlKKg9_aNLPaOKnWcIZ1ZqceRmeT_NpHNHRKgwRmtvgGAIajQjUmHkrnk_Xm6Oxv6vL74tRbGhfN9XZkcDIU7_a1oj_ZhWTf6SwcmPAhUo17sKOG0nHv8PTpMsg4AbggjmazbbbrBEHKGN_afpmFABcMV7Et9Lrk9nKiR1qFfOBJoVjh2lm3f6Co5djYXHt_5KYnya53Bm77T7kew8dtsSOGIHe8PYi" />
                    </div>
                    <span className="font-caption text-on-surface-variant">Liam Chen</span>
                  </div>
                  <span className="font-caption text-outline">1w ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col group border border-outline-variant bg-surface-container-lowest">
              <div className="relative aspect-video overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A detailed schematic diagram shown on a large 4K computer monitor in a dark room. The screen glows with bright blue and white lines on a dark background. The reflection of the schematic is visible on the polished desk surface below. The vibe is focused, high-stakes engineering design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7NRuAu_XFgnss4DQZIfqMj4P9NbDi2nxpTe1SSLMBvOlgrb7Tp-3ACpkruv2pQaKY513fhhUaSFVEbhLh7IJCeWV21SRCRLr55_0trF_UsBtshUfOt3SaG631OKbrdErr_IMq8jtEl1kmrFWHxVydbkzZsQwQ7Z8QUyZF37FVFnbcK6Hdl2ZprSVNkB3GkILvMJSmjb1kXuZeQkgxmJEW9idQifOdoHnwdCpWf8yJ6pi06Hhz_OZ2WE2bxuWrU9CHH9xVRWCnAdkL" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white font-code-label text-[10px]">19:40</div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex gap-2 mb-2">
                  <span className="font-code-label text-[10px] text-on-tertiary-fixed-variant bg-tertiary-fixed px-1.5 py-0.5">THEORY</span>
                </div>
                <h5 className="font-title-sm text-[16px] leading-snug mb-2 group-hover:text-primary transition-colors">Electromagnetic Interference (EMI) Basics</h5>
                <p className="text-on-surface-variant text-caption line-clamp-2 mb-4">Learn why noise occurs in your circuits and how to shield sensitive components.</p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
                      <img className="w-full h-full object-cover" data-alt="A portrait of a senior electronics professor, male, with gray hair and a kind expression. He is wearing a formal blue shirt. The background is a wall of books and technical manuals, suggesting deep expertise and authority." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwd3sX6qG3f_Cm8SOXApO8tsRw7UUTsNr9jCF6SrtvH-l24OwE7AnMTOrcFdl3x0NeSRxuunblHM-A0q5PcBiEohUKl2vF7QkLkcrz20YtvnC0RMT5FqbKo2HeXfIhKkj9MDJLO9JNj5mxp2gnEUcTg-1PVSs8jm5tjRpdclU6J4b62diWDSu8HsqZothQJuULjfkUgGatcVnHRJ0gdFE3VI2AK6SRnmjykiGjDL-XlHLIu8TmNdEmYxLG-qeM7ONno2CtlLiWP9TC" />
                    </div>
                    <span className="font-caption text-on-surface-variant">Prof. Alan Turing</span>
                  </div>
                  <span className="font-caption text-outline">2w ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <button className="px-10 py-3 border border-primary text-primary font-bold hover:bg-primary-container hover:text-white transition-all">
              Load More Tutorials
            </button>
          </div>
        </section>
      </div>

      <div className="fixed pointer-events-none w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" id="mouse-glow"></div>
    </MainLayout>
  );
}
