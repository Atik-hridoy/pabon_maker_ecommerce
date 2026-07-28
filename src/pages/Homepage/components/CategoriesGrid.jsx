import React from 'react';

export default function CategoriesGrid() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">Precision Modules</p>
            <h2 className="font-headline-md text-headline-md text-on-surface">SHOP BY CATEGORY</h2>
          </div>
          <a className="text-secondary font-bold font-label-caps text-label-caps hover:underline" href="#">VIEW ALL CATEGORIES</a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="Microcontrollers &amp; SOCs" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUQRqm5yAb71B0Y8tojtZJzugfUu92RbLyQP_kZCrNApGrgzUvnCm_xAo3yesgcRobu1BPV2d5nb5o8DibH3AEl5LI1YuBEtb2g3MINA5EWHaeQ6CZEZX8S3u6uESM5ly_WhJHVn5vjOFHtxdKQp6_AG-ey4bmVJx4bV2exLqLdoZ-ty2ETF0FWQxhXUGNl5qZQ7dba3YJNu3eUvY55B78MI9ugWo4AGi6yK3DqVGd6XFsru5cEvlXM8lhv-mHlLWVbfoDS6rhtYF2" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">Microcontrollers &amp; SOCs</p>
          </div>
          
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="Sensors &amp; Modules" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn4VqL7OALZhJa63buK2FaEdkD4gz9THGsjLOZUtKi54mAIHWdOL2k-iGnEVAUYBFMKrPE5Q6VBlj4g6g_d7MC9vR8vBQybs9AFRNKQ8xWjmuAQUAvsqAb383pdufiENVjtWqhL5GYPULFE7akYuaMzfChAfEgL8X5XBXFnxzBx4qt4nClqKyFsyk0YXwf9hIQmeBsGxr-y-P4kFJ74C2CkKjElsrsUzulB4DvLm5HBCej8D1_5nNOrtVfcKB9v5hE0CoBBRiGeejs" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">Sensors &amp; Modules</p>
          </div>
          
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="Power Supplies" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUrcH6o4zFFUnW1bvPb_T6PtgcWbNUcgplwgdB5EgPf3oD5_jKym0MoL7fl9C1bNXTISeiyng0sinealf4McKydMn-q3RTMXMBmrhnYw8TL5ydDtlGPVCTbxo6VEvLQKiNVD025FxsTeRXvy-p26UINXZaS7LXtypeUzi6Fj0v78-VP5MpE1jYcZ9eaYqz4EbrJHujWX6fdTFZsVWBBXF5tGQ8Y--WWgxCgvV-sekQq9837uSHXBYPQZJizlDI0BFEHG2F1bVxr8wF" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">Power Supplies</p>
          </div>
          
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="IoT &amp; Wireless" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY109R2x6yUwmyxGVVnrsDQicEeRiCGJKxYT9ToAreRHmqc7HWo8krT2_uyibKkFoRcKkJYCfw9lS4WxJ0w_zA1d4Nt6eG7PaUlWd0tYSgb7iJpHWx51h_JDZtgxbvPE059VhyR-vfHipvZ7IgktdYWzpsWNm4q3t2OBYJR0pY70S6HZAe-mDontEl-jRvnNpj4i3vHIbvMEn8NMJ9zhCOWjj5nksY94AScD4HSCu5kmbOxCcLxebXWsBQB_tqrYdxMCjSCjIIQfK-" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">IoT &amp; Wireless</p>
          </div>
          
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="Robotics &amp; Actuators" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADjroi-O617y6-_ra7KBuTW_7pQVmQdmr-VAMiB_qOifwZGquCtVVs7rdpHOnU0QSEil10W6yUk2fR9NEhc4GSYWojxHbjGqklNxk5XES8dmVY0GTxnB-SvBwm2X_HJWaq1MczQOvTkJVnAdGGGu3Ogjh-pNbZubQZJJUBGlImCBP2k8KU8y6Z6GAt_hTLRY414GTAwWyq4g3wTGSwd4jZQRvRCsIKBy8O6j1ASTV8miEwThVBl_duVGW5PK8c7xAFhrMghJ7c7ibD" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">Robotics &amp; Actuators</p>
          </div>
          
          <div className="group cursor-pointer flex flex-col items-center gap-4">
            <div className="w-full aspect-square bg-white border border-outline-variant rounded-full flex items-center justify-center p-8 group-hover:border-secondary transition-all">
              <img className="w-full h-full object-contain" alt="Passive Components" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWMTgxSqEMchU9F9U_uBUJ96PtOjwsDE5nf5BqZ6sxIpCQJ6hVdC8qMD-mlGeNbC0WAJs4RYp3z9kZiIRqLHiXaGzXDEOxuoLV43PoLUVL8NLvHlS8nJW_AbgCC3Jzsb3tTjsGRqjuPOQpc6PB_fhUpM7zrDtCBr5CEgh3GbW1H3L2wUmZgiz4WE6SsA08aO5qXbbMItQyas_PbVGmXQ8quqsKLM8kg-plKbW-z8J5gljFZ-ky1C5o6Kz4OeZbMcnwflmP_RvXQgbi" />
            </div>
            <p className="font-label-caps text-label-caps text-on-surface text-center font-bold">Passive Components</p>
          </div>
        </div>
      </div>
    </section>
  );
}
