import Display from "@/components/Display";
import Service from "@/components/Service";
import clin from '../../public/Cline.jpg'
import qulity from '../../public/highqulity.jpg'
import days from '../../public/6days.png'
import Cards from "@/components/Cards";



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
        <div className=" w-[100%] p-5 flex flex-col items-center justify-center">
          <h1 className=" font-semibold italic md:text-8xl flex gap-[70px] text-white">
            <span>Be</span>
            <span>The</span>
            <span className=" text-yellow-300">Beast</span>
          </h1>
          <div className=" flex flex-wrap items-center justify-center gap-2 w-[100%] h-[80vh]">
            <Cards/>
            <Cards/>
            <Cards/>
            <Cards/>
          </div>
        </div>
      </section>

    </main>
  );
}
