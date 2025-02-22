import React, { useEffect } from 'react';
import './HomePage.css'; // Import the CSS file for styling
import headerVideo from '../assets/tracker.mp4'; // Import the video
import habitImage1 from '../assets/habit1.png'; // Import habit images
import habitImage2 from '../assets/habit2.png';
import habitImage3 from '../assets/habit3.png';
import featureImage1 from '../assets/feature1.png'; // Import feature images
import featureImage2 from '../assets/feature2.png';
import featureImage3 from '../assets/feature3.png';

const HomePage = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
                card.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
                card.style.transform = 'translateY(0)';
            });
        });

        return () => {
            cards.forEach((card) => {
                card.removeEventListener('mouseenter', null);
                card.removeEventListener('mouseleave', null);
            });
        };
    }, []);

    return (
        <div className="homepage">
            <header className="header">
                <div className="header-content">
                    <h1>Welcome to NextStep</h1>
                    <p>Your ultimate habit tracker to help you achieve your goals.</p>
                </div>
                <div className="header-video">
                    <video width="600" height="300" controls>
                        <source src={headerVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </header>

            <main className="features">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card feature-card-left">
                        <img src={featureImage1} alt="Habit Visualization" />
                        <div className="feature-text">
                            <h3>Habit Visualization</h3>
                            <p>Track your habits over time with our interactive charts.</p>
                        </div>
                    </div>
                    <div className="feature-card feature-card-right">
                        <img src={featureImage2} alt="Calendar" />
                        <div className="feature-text">
                            <h3>Calendar Integration</h3>
                            <p>Plan your days effectively with our integrated calendar feature.</p>
                        </div>
                    </div>
                    <div className="feature-card feature-card-left">
                        <img src={featureImage3} alt="Progress Tracking" />
                        <div className="feature-text">
                            <h3>Daily Progress</h3>
                            <p>Log your habits daily and monitor your streaks.</p>
                        </div>
                    </div>
                </div>
            </main>


            {/* New Body Content Section */}
            <section className="habit-benefits">
                <h2>The Power of Building Good Habits</h2>
                <p>
                    Developing good habits is essential for personal growth and productivity. Whether it's exercising regularly,
                    eating healthier, or reading more books, tracking your habits can help you stay focused and motivated.
                    NextStep allows you to visualize your progress, set reminders, and track your achievements, so you can
                    consistently improve and stay on track.
                </p>
                <div className="habit-images">
                    <img src={habitImage1} alt="Habit Formation" />
                    <img src={habitImage2} alt="Healthy Habits" />
                    <img src={habitImage3} alt="Habit Progress" />
                </div>
                <p>
                    By using NextStep, you'll be able to see how far you've come and get the motivation you need to keep going.
                    It’s more than just tracking – it’s about making small, consistent improvements to your life.
                </p>
            </section>

            <section className="cta">
                <h2>Start Your Journey Today!</h2>
                <p>Sign up and take the first step toward a better you.</p>
                <button className="cta-button" onClick={() => window.location.href = '/signup'}>Get Started</button>
            </section>

            <footer className="footer">
                <p>&copy; 2024 NextStep Habit Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
