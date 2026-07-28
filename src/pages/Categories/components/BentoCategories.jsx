import React from 'react';

export default function BentoCategories() {
  return (
    <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        
        {/* Microcontrollers & SOCs (Large Focus) */}
        <div className="md:col-span-8 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-96">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmns1DLdf4BQSV0d-OsAs-nbcNqSrpWpJ2SbYzTSlYV3zxmuqre_n9TnqXzmIywWu60oGbWK1QVjccYj5oPyt2u3U-9dGPFcJadEkdUUeO4Lk_YmQJn0QQNKblLrV3ZrK6B0EhGttlxULHPCS2VMFEJHM-dWbkSsgEbY4F5GZgvgiGcH0bnTfKgA4_K8B1zkFzSIpIihiCa923ogJypUIkqoiPTOHB7TtB70V6oUnCcFheOanJDNE6D31SCZ6xGzYN5CNe2-13rHbF')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex justify-between items-end">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Microcontrollers &amp; SOCs</h3>
              <p className="text-on-primary-container font-body-sm text-body-sm max-w-sm mb-4">ESP32, STM32, and high-performance RISC-V compute modules for edge intelligence.</p>
              <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
                BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="hidden lg:block">
              <span className="font-technical-data text-technical-data text-on-primary opacity-50 px-3 py-1 border border-on-primary/20 rounded">ARCH: ARM/RISC-V</span>
            </div>
          </div>
        </div>

        {/* Sensors & Modules (Tall) */}
        <div className="md:col-span-4 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-96">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8lc4CKXlu_tj8uWsmDd7jDTDKyI_3jyinjzYA5FvckoQ37jIvaltALyBmXGuyNCWBjWl4VS0AicL-2rZ6RoHXMQA9Aqbz--KcFgMRRaqk20fVe_Qudf2PJAe-jiJY5jmRhyKXudI0M3pfjj7GJmQWew_ICUMWOxmk1t3Oogt9WXxwmpC_N_qo8syr_e23f2lUvS5LSpJ9cv-eOfN2btTisfJhGWNwqR4AVtJ-AD5SUUmnYHMqv-iuoVZtmrkj3FPcnPWuDn_XwYfI')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Sensors &amp; Modules</h3>
            <p className="text-on-primary-container font-body-sm text-body-sm mb-4">Precision telemetry and environmental data acquisition modules.</p>
            <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
              BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Power Supplies (Wide) */}
        <div className="md:col-span-6 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-72">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWzzWSLaIgpBsOwUPH2x3HKnPNXRsMxauS3P0aRIpbFJrKXLw8IjTW1ZSuSjbpmJC9g2_mRS9s1l1ZxGvFah7B4gyJCkYCpqVI-ST0mv_LVtZhmPg4TZRT0gcXxdsaSunby09R7SrG2ccj_MaO5YL51jA05ZVnQAY5vSAbTUHaE3IbH-O-gVb8bYAzFa_cUdg-LLgD3QEpIXOhPDxVYQSN0juvzmA1reT6TOU56_KoplMLzqTfo-OJ08e46FFAx1qjCVsEQWtjTh1s')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Power Supplies</h3>
            <p className="text-on-primary-container font-body-sm text-body-sm mb-4">AC/DC converters, LDOs, and high-efficiency buck-boost regulators.</p>
            <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
              BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* IoT & Wireless (Wide) */}
        <div className="md:col-span-6 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-72">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDrZwTi4S8i0_PgbCbQvPRqe07ZD2VTIzZl9ecrzO1-4YV7MMm7BR-tJCWnLD9QhSvecRuyFlf_gLOSYI4kj9aqH-SeMlLhY1xAtNySTakXe9sxKyU2hy4JC7DxdvMf7vLuSwTYGjlpbhAV5B-ikqOzpYcQ6B8rudVfwdIz49nqhKD5KfcpsTaQ0M9-PnDPbTPqJaRbcNmgRnndxYsUIlMDX6a9WgnF5YvQ8_2LX89PbU2Fv9_Q_P4YY7Hg1HIrrSSXh-dh_ZzfqEWh')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">IoT &amp; Wireless</h3>
            <p className="text-on-primary-container font-body-sm text-body-sm mb-4">Cellular, LoRaWAN, and Bluetooth Low Energy connectivity solutions.</p>
            <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
              BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Robotics & Actuators (Tall) */}
        <div className="md:col-span-4 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-96">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOL_jwmIjtfB1-CGubrqn5TTVG2yPVuGOq8C-5OxKy2Lb0h4uC_D6_VLjmLf2EWKb2mJ7lSAnsD-y8BBQMkylBcjKHJUdw8RtvN8-W83MvQmcLf0e9MLsgSgZ1dledQYfzV0Ea0kTY-1Li4Hb9wHPVlrhioWNSIS0Iq8v0QFALkNnWAcDIhie8qMLnyKyFHrHWdxeNFmu3Z22ikY4SV7EaG8babHIeO5hY6urPHyuFHEnS2Geb3e7Y9V4_80q1sqGCS3t2CX9HB8ga')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Robotics &amp; Actuators</h3>
            <p className="text-on-primary-container font-body-sm text-body-sm mb-4">BLDC motors, servos, and precision motion control drivers.</p>
            <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
              BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

        {/* Passive Components (Large Square) */}
        <div className="md:col-span-8 group relative bg-white border border-outline-variant rounded transition-all duration-300 card-hover-effect overflow-hidden h-96">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div 
              className="w-full h-full transition-transform duration-500 group-hover:scale-105 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAe_o6-jmutwgaRw35fCrPd3fbbK7A770sbmNdHilQ8ayyUX9g6SxBN_0GizVRhq4zyfF9SSn3g3GkFrbCPZDkNZq5jfNVz5Ysg4KQrE5C1nky4PjRJEw5kXnsxeY45o59Afx3iKYmydjJcnGdOlMts29H_X5uWJtPYr2gAkPy3twIEZ2z53VLISoMG2GTPL9uKw-O4Dov3ZmGvzSBGb-9vgQRBJKYPhfoXbQ6iRiMLKmjkWB77bbRFixXhG4LxaWtA4q14tQyG3doH')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80 z-10"></div>
          <div className="absolute bottom-0 left-0 p-8 z-20">
            <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Passive Components</h3>
            <p className="text-on-primary-container font-body-sm text-body-sm mb-4">High-tolerance resistors, MLCCs, and inductors for industrial-grade PCBs.</p>
            <a className="inline-flex items-center text-secondary-container font-bold group/link hover:gap-3 transition-all duration-300 font-label-caps text-label-caps" href="#">
              BROWSE ALL <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
