import React from 'react';

const Blog = () => {
    return (
        <div id="Blog" className="container mx-auto my-14 px-4 md:px-0 text-white">
            <div className="flex flex-col items-center gap-8">
                
                <div className="w-full max-w-4xl text-center">
                    <h1 className="text-yellow-500 text-4xl md:text-5xl font-bold mb-4">
                        Welcome to RK Fitness: Your Ultimate Destination for Health and Strength
                    </h1>
                    <p className="leading-relaxed text-lg md:text-xl font-medium">
                        At RK Fitness, we believe that fitness is not just a routine—it's a lifestyle. Whether you're a seasoned athlete or someone just beginning your fitness journey, our gym is designed to cater to all levels, helping you reach your goals efficiently and safely. Let's dive into what makes RK Fitness your perfect fitness partner!
                    </p>
                </div>

                
                {sections.map((section, index) => (
                    <div key={index} className="w-full max-w-4xl text-center">
                        <h2 className="text-yellow-500 text-3xl md:text-4xl font-semibold mb-4">{section.title}</h2>
                        <p className="leading-relaxed text-lg md:text-xl font-medium">{section.content}</p>
                    </div>
                ))}


                <div className="w-full max-w-4xl text-center">
                    <h1 className="text-yellow-500 text-4xl md:text-5xl font-extrabold mt-10">
                        <ul className=' flex flex-col  md:flex-row' >
                            <li>Start strong.</li>
                            <li>Stay strong.</li>
                            <li>RK Fitness.</li>
                        </ul>
                    </h1>
                </div>
            </div>
        </div>
    );
};

const sections = [
    {
        title: '1. State-of-the-Art Equipment for Every Workout',
        content: 'At RK Fitness, we provide only the best equipment for our members. Our facility is stocked with the latest machines, weights, and functional training tools to ensure you have everything you need to build strength, endurance, and flexibility. Whether you prefer high-intensity interval training (HIIT) or traditional weightlifting, we’ve got you covered.',
    },
    {
        title: '2. Cleanliness and Hygiene at the Forefront',
        content: 'We understand that a clean gym is vital for a healthy workout environment. At RK Fitness, cleanliness is a top priority. Our facility undergoes regular sanitization, and we’ve implemented strict hygiene protocols to ensure a safe and enjoyable experience for everyone.',
    },
    {
        title: '3. Expert Trainers to Guide You',
        content: 'No matter where you are in your fitness journey, having professional guidance makes all the difference. Our highly qualified trainers at RK Fitness are here to provide personalized training plans and expert advice tailored to your individual goals. Whether you\'re looking to lose weight, build muscle, or simply stay active, our trainers are dedicated to your success.',
    },
    {
        title: '4. Variety of Classes and Programs',
        content: 'From yoga and Pilates to strength training and cardio kickboxing, RK Fitness offers a wide range of classes for all interests and skill levels. Our group classes provide an energetic and motivating environment, while our one-on-one personal training sessions ensure personalized attention and results.',
    },
    {
        title: '5. Flexible Membership Plans',
        content: 'At RK Fitness, we offer flexible membership options to fit your schedule and budget. Whether you’re looking for short-term passes or long-term memberships, our plans are designed to give you the best value. Plus, we offer regular promotions and discounts to make your fitness journey more affordable.',
    },
    {
        title: '6. A Community of Support',
        content: 'When you join RK Fitness, you\'re not just signing up for a gym—you’re joining a community. Our members support and motivate each other, creating a positive and encouraging atmosphere. We frequently organize events, challenges, and fitness competitions to keep things fun and engaging.',
    },
    {
        title: '7. Health, Safety, and Wellness First',
        content: 'Your health and safety are our top priorities. With RK Fitness, you can work out knowing that we follow the highest safety standards, including social distancing measures and sanitized equipment. We also offer wellness programs like nutrition counseling and recovery sessions to ensure your overall well-being.',
    },
    {
        title: '8. Join RK Fitness Today!',
        content: 'Ready to take the next step in your fitness journey? Come visit RK Fitness and experience our top-tier facilities, expert trainers, and vibrant community. Whether your goal is to build muscle, lose weight, or simply feel more energetic, RK Fitness is the place to be. Stop by for a tour or sign up online for a membership today!',
    },
];

export default Blog;
