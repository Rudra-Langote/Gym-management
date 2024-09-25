import Display from "@/components/Display";
import Service from "@/components/Service";
import clin from '../../public/Cline.jpg'
import qulity from '../../public/highqulity.jpg'
import days from '../../public/6days.png'
import Cards from "@/components/Cards";
import cd1 from '../../public/Card1.jpg'
import cd2 from '../../public/Card2.jpg'
import cd3 from '../../public/Card3.jpg'
import cd4 from '../../public/Card4.jpg'
import Blog from "@/components/Blog";



export default function Home() {
  return (
    <main>
      <section>
        <Display />
      </section>
      <section>
        <div>
          <Service img={days} head="Open 6 Days A Weak" disc="providing you with flexible access to our facilities and classes. Whether you're an early riser or prefer evening workouts, we're here to help you stay consistent and achieve your fitness goals!" />
        </div>
        <div>
          <Service img={clin} head=" Clean and Hygienic Space" disc="Our gym prioritizes cleanliness and hygiene, ensuring a spotless and safe environment for all members. We follow strict sanitization protocols and maintain high standards to keep you healthy while you focus on your fitness goals." />
        </div>
        <div>
          <Service img={qulity} head="Qulity and Letest Equiptment" disc="Our gym is equipped with the latest, high-quality machines and tools to enhance your workout experience. From cardio to strength training, we provide top-tier equipment designed to help you achieve your fitness goals efficiently and safely" />
        </div>
      </section>
      <section>
        <div id="Package" className=" w-[100%] flex gap-5 flex-col items-center justify-center">
          <h1 className=" font-extrabold text-center   text-8xl  md:text-8xl flex flex-col md:flex-row md:gap-[70px] gap-[10px] text-white">
            <ul className=" md:flex">
              <li>Be</li>
              <li className=" text-yellow-300">The</li>
              <li >Beast</li>
            </ul>
          </h1>
          <div className=" flex flex-col md:flex-row md:flex-wrap m-2   items-center justify-center gap-2 w-[100%] h-auto md:h-[90vh]">
            <Cards img={cd1} title="QuickGain" duration="1 Month" disc1="Flexible Hours" disc2="Mon-Sat"  price="Only ₹700"  />
            <Cards img={cd2} title="BuildPack" duration="3 Month" disc1="Flexible Hours" disc2="Mon-Sat"  price="Only ₹1500"/>
            <Cards img={cd3} title="ProGain" duration="6 Month" disc1="Flexible Hours" disc2="Mon-Sat"  price="Only ₹2999"/>
            <Cards img={cd4} title="PowerPack" duration="12 Month" disc1="Flexible Hours" disc2="Mon-Sat"  price="Only ₹4999"/>
          </div>
        </div>
        <div>
          <Blog/>
        </div>
      </section>

    </main>
  );
}
