import os
from datetime import datetime
from config.db import db
from models.user import hash_password

def seed_db():
    print("Starting database seeding...")
    
    # 1. Seed Users (Clear and insert default admin and customer)
    db.users.delete_many({})
    print("Cleared existing users.")
    
    admin_password = hash_password("admin123")
    user_password = hash_password("user123")
    
    default_users = [
        {
            "name": "Foodie Admin",
            "email": "admin@foodieexpress.com",
            "password": admin_password,
            "role": "admin",
            "created_at": datetime.utcnow()
        },
        {
            "name": "John Doe",
            "email": "user@foodieexpress.com",
            "password": user_password,
            "role": "user",
            "created_at": datetime.utcnow()
        }
    ]
    db.users.insert_many(default_users)
    print("Seeded default users:")
    print(" - Admin: admin@foodieexpress.com / admin123")
    print(" - User: user@foodieexpress.com / user123")
    
    # 2. Seed Foods
    db.foods.delete_many({})
    print("Cleared existing foods.")
    
    sample_foods = [
        # Pizza
        {
            "name": "Double Cheese Margherita",
            "description": "Classic delight with 100% real mozzarella cheese, fresh basil, and house-made rich tomato sauce.",
            "price": 12.99,
            "category": "Pizza",
            "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=60",
            "rating": 4.7,
            "restaurant": "La Pino'z Pizzeria",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Spicy Chicken Fiesta",
            "description": "Spiced double chicken chunks, red paprika, hot jalapenos, and green peppers with a fiery sauce.",
            "price": 15.49,
            "category": "Pizza",
            "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60",
            "rating": 4.5,
            "restaurant": "Pizza Hut",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Garden Veggie Supreme",
            "description": "Loaded with onions, crisp bell peppers, sweet corn, mushrooms, black olives, and juicy tomatoes.",
            "price": 13.99,
            "category": "Pizza",
            "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&auto=format&fit=crop&q=60",
            "rating": 4.3,
            "restaurant": "La Pino'z Pizzeria",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        
        # Burgers
        {
            "name": "Classic Crunch Cheeseburger",
            "description": "Juicy grilled beef patty layered with cheese, fresh lettuce, pickles, tomatoes, and chef's special dressing.",
            "price": 8.99,
            "category": "Burgers",
            "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60",
            "rating": 4.6,
            "restaurant": "Burger King",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Spicy Crispy Chicken Burger",
            "description": "Flaky, breaded chicken breast fillet topped with spicy mayo, iceberg lettuce, and toasted sesame buns.",
            "price": 9.49,
            "category": "Burgers",
            "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=60",
            "rating": 4.8,
            "restaurant": "McDonald's",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Smoky BBQ Bacon Burger",
            "description": "Savory beef patty loaded with crispy bacon, melted cheddar cheese, onion rings, and a rich smoky BBQ glaze.",
            "price": 10.99,
            "category": "Burgers",
            "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=60",
            "rating": 4.4,
            "restaurant": "The Burger Bistro",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        
        # Biryani
        {
            "name": "Hyderabadi Chicken Biryani",
            "description": "Spiced basmati rice and tender chicken cooked in layers under 'dum', topped with fried onions and fresh mint.",
            "price": 14.99,
            "category": "Biryani",
            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=60",
            "rating": 4.9,
            "restaurant": "Behrouz Biryani",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Royal Mutton Dum Biryani",
            "description": "Richly slow-cooked premium lamb chunks marinated in traditional yogurt and spices, layered with fragrant basmati.",
            "price": 16.99,
            "category": "Biryani",
            "image": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=60",
            "rating": 4.8,
            "restaurant": "Mehfil Restaurants",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Paneer Tikka Biryani",
            "description": "Charcoal grilled cottage cheese cubes cooked with aromatic spices, basmati rice, and a splash of saffron water.",
            "price": 11.99,
            "category": "Biryani",
            "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=60",
            "rating": 4.2,
            "restaurant": "Biryani Zone",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        
        # Chinese
        {
            "name": "Veg Hakka Noodles",
            "description": "Wok-tossed noodles cooked with crunch garden vegetables, soy sauce, white pepper, and light aromatic oils.",
            "price": 9.99,
            "category": "Chinese",
            "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=60",
            "rating": 4.3,
            "restaurant": "Mainland China",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Hot & Spicy Manchurian",
            "description": "Fried vegetable balls cooked in a tangy, hot, garlic-flavored dark soy sauce gravy.",
            "price": 10.49,
            "category": "Chinese",
            "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60",
            "rating": 4.5,
            "restaurant": "China Bowl",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Schezwan Chicken Rice",
            "description": "Stir-fried rice with shredded chicken in a spicy, flavorful Schezwan chili paste, celery, and scallions.",
            "price": 11.49,
            "category": "Chinese",
            "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=60",
            "rating": 4.4,
            "restaurant": "Mainland China",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        
        # Desserts
        {
            "name": "Choco Lava Molten Cake",
            "description": "Warm chocolate cake with a soft, liquid cocoa center that oozes out with every spoonful. Served warm.",
            "price": 5.99,
            "category": "Desserts",
            "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=60",
            "rating": 4.9,
            "restaurant": "Baskin Robbins",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Red Velvet Pastry Slice",
            "description": "Decadent layered cake made with premium buttermilk, cocoa, and frosted with rich vanilla cream cheese.",
            "price": 4.99,
            "category": "Desserts",
            "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=60",
            "rating": 4.7,
            "restaurant": "The Baking Company",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        
        # Drinks
        {
            "name": "Fresh Mango Smoothie",
            "description": "Thick and luscious mango shake prepared with fresh Alphonso mango pulp, chilled milk, and vanilla ice cream.",
            "price": 3.99,
            "category": "Drinks",
            "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&auto=format&fit=crop&q=60",
            "rating": 4.6,
            "restaurant": "Shake Studio",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Iced Caramel Macchiato",
            "description": "Freshly brewed espresso shots layered with cold creamy milk, rich vanilla syrup, and a caramel drizzle topping.",
            "price": 4.49,
            "category": "Drinks",
            "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=60",
            "rating": 4.8,
            "restaurant": "Starbucks Coffee",
            "is_available": True,
            "created_at": datetime.utcnow()
        },
        {
            "name": "Refreshing Mint Mojito",
            "description": "Sparkling soda loaded with crushed fresh mint leaves, lime wedges, simple syrup, and lots of crushed ice.",
            "price": 3.49,
            "category": "Drinks",
            "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=60",
            "rating": 4.5,
            "restaurant": "Shake Studio",
            "is_available": True,
            "created_at": datetime.utcnow()
        }
    ]
    
    db.foods.insert_many(sample_foods)
    print(f"Seeded {len(sample_foods)} food items successfully!")
    print("Database seeding completed!")

if __name__ == "__main__":
    seed_db()
