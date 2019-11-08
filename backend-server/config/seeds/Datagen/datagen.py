import random,json
import os
from datetime import datetime,time
from datetime import timedelta

def generateInsertString( tablename, values):
    s = "INSERT INTO " + tablename + " VALUES (" 
    for item in values:
         s = s + item +","
    s = s[:-1] + ");\n"
    return s
def stringifystring(s):
    return "'" + s + "'"
NUMUSERS = 1000
NUMFRANCHISORS =50
FOODCOOKINGSTYLE =['Baked', 'Fried', 'Roasted', 'Grilled', 'Poached', 'Simmered', 'Broiled', 'Blanched', 'Braised', 'Stewed', 'Barebequed', 'Boiled', 'Cured', 'Dry Roasted', 'Oven Roasted',
'Sun Dried', 'Fermented', 'Juiced', 'Mashed', 'Microwaved', 'Pan Fried', 'Seared']
FOODTYPE=['Cabbage', 'cake', 'carrots', 'carne', 'celery', 'cheese', 'chicken', 'catfish', 'chips', 'chocolate', 'chowder', 'clams', 'coffee', 'cookies', 'corn', 'cupcakes', 'crab', 'curry', 'cereal', 'chimichanga', 'Bruscetta', 'bacon', 'black', 'bagels', 'baked', 'BBQ', 'bison', 'barley', 'beer', 'bisque', 'bluefish', 'bread', 'broccoli', 'buritto', 'babaganoosh', 'asparagus', 'apples', 'avacado', 'alfalfa', 'acorn', 'almond', 'arugala', 'artichoke', 'applesauce', 'albacore', 'Apple', 'Avocado', 'dates', 'dips', 'duck', 'dumplings', 'donuts', 'eggs', 'enchilada', 'eggrolls', 'edimame', 'eel', 'fajita', 'falafel', 'fish', 'franks', 'fondu', 'Garlic', 'ginger', 'gnocchi', 'goose', 'granola', 'grapes', 'green', 'Guancamole', 'gumbo', 'grits', 'Graham', 'ham', 'halibut', 'hamburger', 'honey', 'huenos', 'hash', 'hot', 'haiku', 'hummus', 'ice', 'jambalaya', 'jelly', 'jerky', 'jalapeno', 'kale', 'kabobs', 'ketchup', 'kiwi', 'kidney', 'kingfish', 'lobster', 'Lamb', 'Linguine', 'Lasagna', 'Meatballs', 'Moose', 'Milk', 'Milkshake', 'Noodles', 'Ostrich', 'Pizza', 'Pepperoni', 'Porter', 'Pancakes', 'Quesadilla', 'Quiche', 'Reuben', 'Spinach', 'Spaghetti', 'Tater', 'Toast', 'Venison', 'Waffles', 'Wine', 'Walnuts', 'Yogurt', 'Ziti', 'Zucchini']
FOODDESCRIPTOR=['Acidic', 'Astringent', 'Bitter', 'Bittersweet', 'Bland', 'Hot', 'Mature', 'Mild', 'Ripe', 'Savoury', 'Seasoned', 'Sharp', 'Sour', 'Spicy', 'Sweet-and-sour', 'Gamey', 'Tart', 'Unsalted', 'Watery', 'Acerbic', 'Acid', 'Acidic', 'Acrid', 'Aftertaste', 'Aged', 'Ambrosial', 'Ample', 'Appealing', 'Appetizing', 'Aromatic', 'Astringent', 'Baked', 'Balsamic', 'Beautiful', 'Bite-size', 'Bitter', 'Bland', 'Blazed', 'Blended', 'Blunt', 'Boiled', 'Brackish', 'Briny', 'Brown', 'Browned', 'Burnt', 'Buttered', 'Caked', 'Calorie', 'Candied', 'Caramelized', 'Caustic', 'Center cut', 'Char-broiled', 'Cheesy', 'Chilled', 'Chocolate', 'Chocolate flavored', 'Choice', 'Cholesterol free', 'Chunked', 'Cinnamon', 'Classic', 'Classy', 'Clove coated', 'Cold', 'Cool', 'Copious', 'Country', 'Crafted', 'Creamed', 'Creamy', 'Crisp', 'Crunchy', 'Cured', 'Cutting', 'Dazzling', 'Deep-fried', 'Delectable', 'Delectable', 'Delicious', 'Delight', 'Delightful', 'Distinctive', 'Doughy', 'Dressed', 'Dripping', 'Drizzle', 'Drizzled', 'Dry', 'Dulcified', 'Dull', 'Edible', 'Elastic', 'Encrusted', 'Epicurean taste', 'Ethnic', 'Extraordinary', 'Famous', 'Fantastic', 'Fetid', 'Fiery', 'Filet', 'Fizzy', 'Flaky', 'Flat', 'Flavored',
'Flavorful', 'Flavorless', 'Flavorsome', 'Fleshy', 'Fluffy', 'Fragile', 'Free', 'Free â€“ range', 'Fresh', 'Fried', 'Frosty', 'Frozen', 'Fruity', 'Full', 'Full-bodied', 'Furry', 'Famy', 'Garlic', 'Garlicky', 'Generous', 'Generous portion', 'Gingery', 'Glazed', 'Golden', 'Gorgeous', 'Gourmet', 'Greasy', 'Grilled', 'Gritty', 'Gustatory', 'Half', 'Harsh', 'Heady', 'Heaping', 'Heart healthy', 'Heart smart', 'Hearty', 'Heavenly', 'Homemade', 'Honey', 'Honeyed', 'Honey-glazed', 'Hot', 'Ice-cold', 'Icy', 'Incisive', 'Indulgent', 'Infused', 'Insipid', 'Intense', 'Intriguing', 'Juicy', 'Jumbo', 'Kosher', 'Large', 'Lavish', 'Layered', 'Lean', 'Leathery', 'Lemon', 'Less', 'Light / lite', 'Lightly salted', 'Lightly-breaded', 'Lip smacking', 'Lively', 'Low', 'Low sodium', 'Low-fat', 'Lukewarm', 'Luscious', 'Lush', 'Marinated', 'Mashed', 'Mellow', 'Mild', 'Minty', 'Mixed', 'Mixture of', 'Moist', 'Moist', 'Mouth-watering', 'Nationally famous', 'Natural', 'Nectarous', 'Non-fat', 'Nutmeg', 'Nutty', 'Oily', 'Open face', 'Organic', 'Overpowering', 'Palatable indicates', 'Penetrating', 'Peppery', 'Perfection', 'Petite', 'Pickled', 'Piquant', 'Plain', 'Pleasant', 'Plump', 'Poached', 'Popular', 'Pounded', 'Prepared', 'Prickly', 'Pulpy', 'Pungent', 'Pureed', 'Rancid', 'Rank', 'Reduced', 'Refresh', 'Rich', 'Ripe', 'Roasted', 'Robust', 'Rotten', 'Rubbery', 'Saccharine', 'Saline', 'Salty', 'Savory', 'Sapid', 'Saporific', 'Saporous', 'Satin', 'Satiny', 'Sauteed', 'Savorless', 'Savory', 'Scrumptious', 'Sea salt', 'Seared', 'Seasoned', 'Served in', 'Served with', 'Sharp', 'Sharp-tasting', 'Silky', 'Simmered', 'Sizzling', 'Skillfully', 'Small', 'Smelly', 'Smoked', 'Smoky', 'Smooth', 'Smothered', 'Soothing', 'Sour', 'Southern style', 'Special', 'Spiced', 'Spicy', 'Spiral-cut', 'Spongy', 'Sprinkled', 'Stale', 'Steamed', 'Steamy', 'Sticky', 'Stinging', 'Strawberry flavored', 'Strong', 'Stuffed', 'Succulent', 'Sugar coated', 'Sugar free', 'Sugared', 'Sugarless', 'Sugary', 'Superb', 'Sweet', 'Sweet-and-sour', 'Sweetened', 'Syrupy', 'Tangy', 'Tantalizing', 'Tart', 'Tasteful', 'Tasteless', 'Tasty', 'Tender', 'Tepid', 'Terrific', 'Thick', 'Thin', 'Toasted', 'Toothsome', 'Topped', 'Tossed', 'Tough', 'Traditional', 'Treacly', 'Treat', 'Unflavored', 'Unsavory', 'Unseasoned', 'Vanilla', 'Vanilla flavored', 'Velvety', 'Vinegary', 'Warm', 'Waxy', 'Weak', 'Whipped', 'Whole', 'Wonderful', 'Yucky', 'Yummy', 'Zesty', 'Zingy']

AREAS =['Downtown Core', 'Outram', 'Sentosa', 'Rochor', 'Orchard', 'Newton', 'River Valley', 'Bukit Timah', 'Holland Road', 'Tanglin', 'Novena', 'Thomson', 'Bishan', 'Bukit Merah', 'Geylang', 'Kallang', 'Marine Parade', 'Queenstown', 'Southern Islands', 'Toa Payoh', 'Central Water Catchment', 'Lim Chu Kang', 'Mandai', 'Sembawang', 'Simpang', 'Sungei Kadut', 'Woodlands', 'YishunAng Mo Kio', 'Hougang', 'North-Eastern Islands', 'Punggol', 'Seletar', 'Sengkang', 'Serangoon', 'Bedok', 'Changi', 'Changi Bay', 'Paya Lebar',
'Pasir Ris', 'Tampines', 'Bukit Batok', 'Bukit Panjang', 'Boon Lay', 'Pioneer', 'Choa Chu Kang', 'Clementi', 'Jurong East', 'Jurong West', 'Tengah', 'Tuas', 'Western Islands', 'Western Water Catchment', 'Benoi', 'Ghim Moh', 'Gul', 'Pandan Gardens', 'Jurong Island', 'Kent Ridge', 'Nanyang', 'Pioneer', 'Pasir Laba', 'Teban Gardens', 'Toh Tuck', 'Tuas South', 'West Coast']
LOCATIONROADTYPE = ['Road', 'Street', 'Way', 'Avenue', 'Drive', 'Lane', 'Grove', 'Gardens', 'Place', 'Circus', 'Crescent', 'Bypass', 'Close', 'Square', 'Hill', 'Mews', 'Vale', 'Rise', 'Wharf', 'End', 'Court', 'Cross', 'Side', 'View', 'Walk', 'Park', 'Meadow']
FIRSTNAMES = ['Retta', 'Claudie', 'Carmine', 'Lacey', 'Carlota', 'Emmaline', 'Adah', 'Judson', 'Jenae', 'Katharyn', 'Hal', 'Kristan', 'Micaela', 'Mohammed', 'Yadira', 'Rudolph', 'Elenor', 'Arianne', 'Ariana', 'Jacalyn', 'Joanne', 'Debby', 'Denita', 'Theodore', 'Sheron', 'Jena', 'Mimi', 'Trenton', 'Jacquline', 'Cristina', 'Deandre', 'Holley', 'Roxie', 'Nita', 'Rosalba', 'Myriam', 'Thad', 'Dante', 'Ivey', 'Marian', 'Leoma', 'Danette', 'Jerica', 'Ella', 'Simona', 'Melida', 'Zachary', 'Peter', 'Quentin', 'Denisha']
LASTNAMES = ['Hermann', 'Chaffins', 'Press', 'Feth', 'Wisneski', 'Patti', 'Ketcher', 'Maust', 'Cowden', 'Siebert', 'Connor', 'Testani', 'Blizzard', 'Depaul', 'Doney', 'Poteete', 'Denn', 'Pushard', 'Villeneuve', 'Butterfield', 'Mickle', 'Allshouse', 'Arpin', 'Huyser', 'Jeffery', 'Mathieson', 'Tavares', 'Dobbin', 'Schuler', 'Nordin', 'Kester', 'Pawlak', 'Loth', 'Lim', 'Buntin', 'Moors', 'Resendez', 'Pappan', 'Balch', 'Herz', 'Macdonald', 'Musselman', 'Abele', 'Boroughs', 'Pechacek', 'Tippin', 'Proehl', 'Warman', 'Witter', 'Kirton']
FIRSTLAST = FIRSTNAMES+LASTNAMES
FranchsisorD1 = ['Eats', 'Vittles', 'Grub', 'Pabulum', 'Larder', 'Comfort-food', 'Soul-food', 'Health-food', 'Junk-food', 'Fast-food', 'Haute-cuisine', 'Cookery', 'Aliment', 'Meals', 'Board', 'Mess', 'Subsistence', 'Table', 'Bread', 'Meat', 'Meat and drink', 'Menu', 'Cooking', 'Cuisine', 'Ration', 'Rations', 'Stores', 'Provisions', 'Viands', 'Comestibles', 'Edibles', 'Refreshment', 'Nutriment', 'Foodstuffs', 'Fare', 'Diet', 'Victuals', 'Sustenance', 'Nourishment']
RestaurantD1  = ['bar', 'cafeteria', 'cafe', 'canteen', 'chophouse', 'coffee shop', 'diner', 'dining room', 'dive', 'doughtnut shop', 'drive-in', 'eatery', 'eating house', 'eating place', 'fast-food place', 'greasy spoon', 'grill', 'hamburger stand', 'hashery', 'hideaway', 'hotdog stand', 'inn', 'joint', 'luncheonette', 'lunchroom', 'night club', 'outlet', 'pizzeria', 'saloon', 'soda fountain', 'watering hole']
POSSIBLECUISINES =['Mexican', 'Swedish', 'Latvian', 'Italian', 'Spanish', 'American', 'Scottish', 'British', 'Thai', 'Japanese', 'Chinese', 'Indian', 'Canadian', 'Russian', 'Jewish', 'Polish', 'German', 'French', 'Hawaiian', 'Brazilian', 'Peruvian', 'Salvadorian', 'Cuban', 'Tibetan', 'Egyptian', 'Greek', 'Belgian', 'Irish', 'Welsh', 'Mormon', 'Cajun', 'Portuguese', 'Turkish', 'Haitian', 'Tahitian', 'Kenyan', 'Korean', 'Algerian', 'Nigerian', 'Libyan']

useraccounts={}
franchisoraccounts={}
def generateUser():
    def generateUserInner():
        first = FIRSTNAMES[random.randint(0,len(FIRSTNAMES)-1)]
        last = LASTNAMES[random.randint(0,len(LASTNAMES)-1)]
        user = first+last+str(random.randint(0,99))
        if (user not in useraccounts.keys()) and (user not in franchisoraccounts.keys()):
            useraccounts[user] = {'UserID':stringifystring(user), 'name': stringifystring(first+' '+last)}
    while len(useraccounts.keys()) <NUMUSERS:
        generateUserInner()
def generateFranchisor():
    def generateFranchisorInner():
        name1 = FIRSTLAST[random.randint(0,len(FIRSTLAST)-1)]
        name2 = FranchsisorD1[random.randint(0,len(FranchsisorD1)-1)]
        user = name1+name2+"account"
        if (user not in useraccounts.keys()) and (user not in franchisoraccounts.keys()):
            if ( stringifystring((name1+' '+name2)) not in map( lambda x: x['FNAME'] ,franchisoraccounts.values() ) ):
                franchisoraccounts[user] = {'UserID':stringifystring(user), 'FNAME': stringifystring(name1+' '+name2)}
    while len(franchisoraccounts.keys()) <NUMFRANCHISORS:
        generateFranchisorInner()



restaurantsURL = {}
restaurants = {}
Foodstable = {}
Tablestable = {}
SpecialOperatingHrsTable ={}
def generateRestaurants():
    def generateRestaurantsinnner(UserID):
        #print( n)
        storeName = franchisoraccounts[UserID]['FNAME'].strip("'") + " " + RestaurantD1[random.randint(0,len(RestaurantD1)-1)]
        Area = AREAS[random.randint(0,len(AREAS)-1)]
        Location = str(random.randint(1,100)) + " " +  Area + ' ' + LOCATIONROADTYPE[random.randint(0,len(LOCATIONROADTYPE)-1)]
        Location = Location + " #" + "{:02d}".format(random.randint(0,99)) + "-" + "{:03d}".format(random.randint(0,999))
        Location = Location + " Singapore" + "{:06d}".format(random.randint(0,999999))
        numberofTables = random.randint(5,30)
        openinghours = "{:02d}".format(random.randint(4,12))  + ":" + "{:02d}".format(random.randint(0,1)*30) + ":00"
        closinghours = "{:02d}".format(random.randint(18,23)) + ":" + "{:02d}".format(random.randint(0,1)*30) + ":00"
        url = storeName.replace(" ","-")+"{:04d}".format(random.randint(0,9999))
        
        #tables
        tables=[]
        capacity=0
        for i in range(numberofTables):
            t=generateTablesinner(Location,UserID,i)
            tables.append(t)
            capacity+=t[3]

        #FOOD
        cuisines = []
        Foods =[]
        numcuisines=random.randint(1,3)
        def pickcuisines(num):
            while len(cuisines) < num:
                pick = POSSIBLECUISINES[random.randint(0,len(POSSIBLECUISINES)-1)]
                if pick not in cuisines:
                    cuisines.append(pick)
        pickcuisines(numcuisines)
        for c in cuisines:
            cFoods=[]
            noFood = random.randint(1,5)
            while len(cFoods)<noFood:
                testfood = generateFoodinner(Location,UserID,c)
                if testfood[2] not in map(lambda x: x[2],cFoods):
                    cFoods.append(testfood)
            Foods.extend(cFoods.copy())
        
        #specialOperatingHours
        specialops = generateSpecialOperatingHrs(Location,UserID)
         
        if( ((Location, UserID) not in restaurants) and ((url) not in restaurantsURL) ):
            restaurants[(Location, UserID)] = {
                'Store_Name' : stringifystring(storeName),
                'Location': stringifystring(Location),
                'UserID': stringifystring(UserID),
                'Capacity': str(capacity),
                'Area': stringifystring(Area),
                'Opening_hours': stringifystring(openinghours),
                'Closing_hours': stringifystring(closinghours),
                'url':stringifystring(url)
            }
            restaurantsURL[url] = 1
            for item in Foods:
                Foodstable[(item[2], Location, UserID)] = {
                    'Location':stringifystring(Location),
                    'UserID': stringifystring(UserID),
                    'Name' :stringifystring(item[2]),
                    'Cuisine': stringifystring(item[3]),
                    'Type' :stringifystring(item[4]),
                    'Price':str(item[5])
                }
            for item in tables:
                Tablestable[(item[2], Location, UserID)] = {
                    'Location':stringifystring(item[0]),
                    'UserID': stringifystring(item[1]),
                    'TableNum': str(item[2]),
                    'Capacity': str(item[3])
                }
            if random.randint(0,10) == 10: 
                for item in specialops:
                    #print((item[2], Location, UserID))
                    SpecialOperatingHrsTable[(item[2], Location, UserID)] = {
                        'Location':stringifystring(item[0]),
                        'UserID': stringifystring(item[1]),
                        'Day_of_week': str(item[2]),
                        'Opening_hours': stringifystring(item[3]),
                        'Closing_hours': stringifystring(item[4])
                    }
                    #print( SpecialOperatingHrsTable[(item[2], Location, UserID)])
            return 1
        return 0

            
    def generateFoodinner(Location,UserID,Cuisine):
        #FOODCOOKINGSTYLE FOODTYPE FOODDESCRIPTOR
        foodtype=FOODTYPE[random.randint(0,len(FOODTYPE)-1)]
        name = FOODDESCRIPTOR[random.randint(0,len(FOODDESCRIPTOR)-1)] + " " + FOODCOOKINGSTYLE[random.randint(0,len(FOODCOOKINGSTYLE)-1)]+" " +foodtype
        price = random.randint(1,500) / 10
        return [Location,UserID,name,Cuisine,foodtype,price]
    def generateTablesinner(Location,UserID,TableNum):
        return [Location,UserID,TableNum,random.randint(2,20)]
    def generateSpecialOperatingHrs(Location,UserID):
        numberOfDaysinWeek = random.randint(1,6)
        chosendays= []
        out =[]
        while len(out)< numberOfDaysinWeek:
            weekday = random.randint(0,6)
            specialopeninghours = "{:02d}".format(random.randint(3,13))  + ":" + "{:02d}".format(random.randint(0,1)*30) + ":00"
            specialclosinghours = "{:02d}".format(random.randint(16,23)) + ":" + "{:02d}".format(random.randint(0,1)*30) + ":00"
            if weekday not in chosendays:
                out.append((Location,UserID,weekday,specialopeninghours,specialclosinghours))
        return out
    for f in franchisoraccounts:
        numberofRestaurants = random.randint(1,10)
        generatedRestaurants = 0
        while generatedRestaurants < numberofRestaurants:
            generatedRestaurants+=generateRestaurantsinnner(f)

    pass

reservations={}
customerswhoreserved={}
numberofreservingCustomers = 30
maxreservationspercustomer = 10
def generateReservations():
    def innergenerateReservations(cuid,tnum,loc,ruid,pax,attemptedtime):
        #datetime.isoformat(sep='T')
        attemptedtime = stringifystring(attemptedtime.isoformat(sep='T'))
        rating =['NULL','1','2','3','4','5']
        reservations[(cuid,ruid,tnum,loc,attemptedtime)] = {
            'Customer_UserID':cuid,
            'TableNum': tnum,
            'Location': loc,
            'Restaurant_UserID': ruid,
            'Pax': str(pax),
            'DateTime': attemptedtime,
            'Rating': random.choice(rating)
        }
        customerswhoreserved[cuid] += 1
        
    while len(customerswhoreserved.keys()) < numberofreservingCustomers:
        attemptedcustomerkey = random.choice(list(useraccounts.keys()))
        attemptedcustomer = useraccounts[attemptedcustomerkey]
        numberofresestotry = random.randint(1,maxreservationspercustomer)
        customerswhoreserved[attemptedcustomer['UserID']] = 0
        while (customerswhoreserved[attemptedcustomer['UserID']] < numberofresestotry):
            attemptedtime=datetime.today() + timedelta(days = random.randint(0,31),hours=random.randint(0,24),minutes=random.randint(0,12)*5)
            attemptedtime= attemptedtime.replace(minute=0,second =0,microsecond=0)
            dayofweek = attemptedtime.weekday()
            attempteddate = datetime(attemptedtime.year,attemptedtime.month,attemptedtime.day)
            attemptedrestaurantkey = random.choice(list(restaurants.keys()))
            attemptedrestaurant = restaurants[attemptedrestaurantkey]
            normalopen = time.fromisoformat(attemptedrestaurant['Opening_hours'].strip("'"))
            normalclose =time.fromisoformat(attemptedrestaurant['Closing_hours'].strip("'"))
            normalopen = attempteddate + timedelta(hours=normalopen.hour,minutes=normalopen.minute)
            normalclose = attempteddate + timedelta(hours=normalclose.hour,minutes=normalclose.minute)
            pax = random.randint(1,5)

            if ( (dayofweek,attemptedrestaurantkey[0],attemptedrestaurantkey[1]) in SpecialOperatingHrsTable):
                spechrs = SpecialOperatingHrsTable[(dayofweek,attemptedrestaurantkey[0],attemptedrestaurantkey[1])]
                specopen =  time.fromisoformat(spechrs['Opening_hours'].strip("'"))
                specopen = attempteddate + timedelta(hours=specopen.hour,minutes=specopen.minute)
                specclose = time.fromisoformat(spechrs['Closing_hours'].strip("'"))
                specclose = attempteddate + timedelta(hours=specclose.hour,minutes=specclose.minute)

                if attemptedtime < specopen or attemptedtime + timedelta(hours=2)> specclose:
                    continue
            elif attemptedtime < normalopen or attemptedtime + timedelta(hours=2)> normalclose:
                    continue
            # print(attemptedcustomer['UserID'])
            ff0 = lambda x:  x['Customer_UserID'] == attemptedcustomer['UserID'] and ( attemptedtime - datetime.fromisoformat(x['DateTime'].strip("'")) < timedelta(hours=2) ) and ( attemptedtime - datetime.fromisoformat(x['DateTime'].strip("'")) > timedelta(hours=-2) ) 
            if list(filter(ff0,reservations.values())):
                continue
            def ff(x):
                return x['Location'] == attemptedrestaurant['Location'] and x['UserID'] == attemptedrestaurant['UserID'] and int(x['Capacity']) >= pax
            possibleseats = list(filter(ff ,Tablestable.values()))

            if not possibleseats:
                continue
            possibleseats.sort(key=lambda x: int(x['Capacity']))
            for seat in possibleseats:
                ff2 = lambda x:  x['Location'] == attemptedrestaurant['Location'] and x['Customer_UserID'] == attemptedrestaurant['UserID'] and seat['TableNum']==x['TableNum'] and attemptedtime - datetime.fromisoformat(x['DateTime'].strip("'")) < timedelta(hours=2) and ( attemptedtime - datetime.fromisoformat(x['DateTime'].strip("'")) > timedelta(hours=-2) )
                if not list(filter(ff2,reservations.values())):
                    #found suitable seat
                    innergenerateReservations(attemptedcustomer['UserID'],seat['TableNum'],attemptedrestaurant['Location'],attemptedrestaurant['UserID'],pax,attemptedtime)
                    break
POSSIBLEVOUCHER = ['AAH', 'AAL', 'AAS', 'ABA', 'ABB', 'ABO', 'ABS', 'ABY', 'ACE', 'ACH', 'ACT', 'ADD', 'ADO', 'ADS', 'ADZ', 'AFF', 'AFT', 'AGA', 'AGE', 'AGO', 'AGS', 'AHA', 'AHI', 'AHS', 'AIA', 'AID', 'AIL', 'AIM', 'AIN', 'AIR', 'AIS', 'AIT', 'AKA', 'AKE', 'ALA', 'ALB', 'ALE', 'ALF', 'ALL', 'ALP', 'ALS', 'ALT', 'AMA', 'AMI', 'AMP', 'AMU', 'ANA', 'AND', 'ANE', 'ANI', 'ANN', 'ANT',
'ANY', 'APE', 'APO', 'APP', 'APT', 'ARB', 'ARC', 'ARD', 'ARE', 'ARF', 'ARK', 'ARM', 'ARS', 'ART', 'ARY', 'ASH', 'ASK', 'ASP', 'ASS', 'ATE', 'ATT', 'AUA', 'AUE', 'AUF', 'AUK', 'AVA', 'AVE', 'AVO', 'AWA', 'AWE', 'AWL', 'AWN', 'AXE', 'AYE', 'AYS', 'AYU', 'AZO', 'BAA', 'BAC', 'BAD', 'BAG', 'BAH', 'BAL', 'BAM', 'BAN', 'BAP', 'BAR', 'BAS', 'BAT', 'BAY', 'BOA', 'BRA', 'CAA', 'CAB', 'CAD', 'CAG', 'CAM', 'CAN', 'CAP', 'CAR', 'CAT', 'CAW', 'CAY', 'CAZ', 'CHA', 'DAB', 'DAD', 'DAE', 'DAG', 'DAH', 'DAK', 'DAL', 'DAM',
'DAN', 'DAP', 'DAS', 'DAW', 'DAY', 'EAN', 'EAR', 'EAS', 'EAT', 'EAU', 'ERA', 'ETA', 'FAA', 'FAB', 'FAD', 'FAE', 'FAG', 'FAH', 'FAN', 'FAP', 'FAR', 'FAS', 'FAT', 'FAW', 'FAX', 'FAY', 'FRA', 'GAB', 'GAD', 'GAE', 'GAG', 'GAL', 'GAM', 'GAN', 'GAP', 'GAR', 'GAS', 'GAT', 'GAU', 'GAY', 'GOA', 'HAD', 'HAE', 'HAG', 'HAH', 'HAJ', 'HAM', 'HAN', 'HAO', 'HAP', 'HAS', 'HAT', 'HAW', 'HAY', 'HOA', 'ITA', 'JAB', 'JAG', 'JAI', 'JAK', 'JAM', 'JAP', 'JAR', 'JAW', 'JAY', 'KAB', 'KAE', 'KAF', 'KAI', 'KAK', 'KAM', 'KAS', 'KAT',
'KAW', 'KAY', 'KEA', 'KOA', 'LAB', 'LAC', 'LAD', 'LAG', 'LAH', 'LAM', 'LAP', 'LAR', 'LAS', 'LAT', 'LAV', 'LAW', 'LAX', 'LAY', 'LEA', 'MAA', 'MAC', 'MAD', 'MAE', 'MAG', 'MAK', 'MAL', 'MAM', 'MAN', 'MAP', 'MAR', 'MAS', 'MAT', 'MAW', 'MAX', 'MAY', 'MNA', 'MOA', 'NAB', 'NAE', 'NAG', 'NAH', 'NAM', 'NAN', 'NAP', 'NAS', 'NAT', 'NAW', 'NAY', 'OAF', 'OAK', 'OAR', 'OAT', 'OBA', 'OCA', 'ODA', 'OKA', 'ORA', 'OVA', 'PAC', 'PAD', 'PAH', 'PAL', 'PAM', 'PAN', 'PAP', 'PAR', 'PAS', 'PAT', 'PAV', 'PAW', 'PAX', 'PAY', 'PEA',
'PIA', 'POA', 'PYA', 'QAT', 'QUA', 'RAD', 'RAG', 'RAH', 'RAI', 'RAJ', 'RAM', 'RAN', 'RAP', 'RAS', 'RAT', 'RAW', 'RAX', 'RAY', 'RIA', 'RYA', 'SAB', 'SAC', 'SAD', 'SAE', 'SAG', 'SAI', 'SAL', 'SAM', 'SAN', 'SAP', 'SAR', 'SAT', 'SAU', 'SAV', 'SAW', 'SAX', 'SAY', 'SAZ', 'SEA', 'SHA', 'SKA', 'SMA', 'SPA', 'TAB', 'TAD', 'TAE', 'TAG', 'TAI', 'TAJ', 'TAK', 'TAM', 'TAN', 'TAO', 'TAP', 'TAR', 'TAS', 'TAT', 'TAU', 'TAV', 'TAW', 'TAX', 'TAY', 'TEA', 'TWA', 'UTA', 'UVA', 'VAC', 'VAE', 'VAG', 'VAN', 'VAR', 'VAS', 'VAT',
'VAU', 'VAV', 'VAW', 'VIA', 'WAB', 'WAD', 'WAE', 'WAG', 'WAI', 'WAN', 'WAP', 'WAR', 'WAS', 'WAT', 'WAW', 'WAX', 'WAY', 'WHA', 'YAD', 'YAE', 'YAG', 'YAH', 'YAK', 'YAM', 'YAP', 'YAR', 'YAW', 'YAY', 'YEA', 'ZAG', 'ZAP', 'ZAS', 'ZAX', 'ZEA', 'ZOA']
VOUCHERDESCRIPTOR = ['Affable', 'Affectionate', 'Agreeable', 'Ambitious', 'Amiable', 'Amicable', 'Amusing', 'Brave', 'Bright', 'Broad-minded', 'Calm', 'Careful', 'Charming', 'Communicative', 'Compassionate', 'Conscientious', 'Considerate', 'Convivial', 'Courageous', 'Courteous', 'Creative', 'Decisive', 'Determined', 'Diligent', 'Diplomatic', 'Discreet', 'Dynamic', 'Easygoing', 'Emotional', 'Energetic', 'Enthusiastic', 'Exuberant', 'Fair-minded', 'Faithful', 'Fearless', 'Forceful', 'Frank', 'Friendly', 'Funny', 'Generous', 'Gentle', 'Good', 'Gregarious', 'Hard-working', 'Helpful', 'Honest', 'Humorous', 'Imaginative', 'Impartial', 'Independent', 'Intellectual', 'Intelligent', 'Intuitive', 'Inventive', 'Kind', 'Loving', 'Loyal', 'Modest', 'Neat', 'Nice', 'Optimistic', 'Passionate', 'Patient', 'Persistent', 'Pioneering', 'Philosophical', 'Placid', 'Plucky', 'Polite', 'Powerful', 'Practical', 'Pro-active', 'Quick-witted', 'Quiet', 'Rational', 'Reliable', 'Reserved', 'Resourceful', 'Romantic', 'Self-confident', 'Self-disciplined', 'Sensible', 'Sensitive', 'Shy', 'Sincere', 'Sociable', 'Straightforward',
'Sympathetic', 'Thoughtful', 'Tidy', 'Tough', 'Unassuming', 'Understanding', 'Versatile', 'Warmhearted', 'Willing', 'Witty']
possibleVouchers ={}
customerVouchers = {}
customerwithVouchers ={}
NUMPOSSIBLEVOUCHERS =30
VOUCHERSPERCUSTOMER = 20
percentOFCUSTOMERSWHOHAVEVOUCHERS = 30

def generateVouchers():
    counter =0
    def innergeneratepossibleVouchers():
        name = 'Hungri' + random.choice(POSSIBLEVOUCHER)
        discount = random.randint(1,100)
        des = "Only for our most " + random.choice(VOUCHERDESCRIPTOR) + " customers."
        cost = random.randint(0,300)
        if name not in possibleVouchers.keys():
            possibleVouchers[name] = {
                "Voucher_code":stringifystring(name),
                "Discount" :str(discount),
                "Description" :stringifystring(des),
                "Cost" :str(cost)
            }
    def innergenerateCustomerVouchers(counter):
        UserID = random.choice(list(useraccounts.keys()))
        if UserID not in customerwithVouchers.keys():
            customerwithVouchers[UserID] = 1
            for i in range(VOUCHERSPERCUSTOMER):
                Voucher_code = random.choice(list(possibleVouchers.keys()))
                Is_used = random.choice([True,False])
                customerVouchers[(Voucher_code, UserID, counter)] = {
                    "Voucher_code":possibleVouchers[Voucher_code]["Voucher_code"],
                    "UserID" :useraccounts[UserID]['UserID'],
                    "Is_used" :stringifystring(str(Is_used))
                }
                counter+=1

    while len(possibleVouchers.keys())<  NUMPOSSIBLEVOUCHERS:
        innergeneratepossibleVouchers()
    # print(list(possibleVouchers.values())[0])
    while len(customerwithVouchers.keys()) <  round((len(useraccounts) /100 )* percentOFCUSTOMERSWHOHAVEVOUCHERS):
        innergenerateCustomerVouchers(counter)
    # print(list(customerVouchers.values())[0])

def generateSQL():
    #all
    f = prepfile("AccountsSQL")
    tablename = 'Account'
    for item in useraccounts:
        values = [ useraccounts[item]['UserID'], stringifystring('$2a$10$RmRGpeXYl.to5r1zdgx4/eQf7yJYgvG8wfq1dnYywaZE6DOymW3VK')]
        sql = generateInsertString(tablename,values)
        f.write(sql)

    for item in franchisoraccounts:
        values = [ franchisoraccounts[item]['UserID'], stringifystring("$2a$10$RmRGpeXYl.to5r1zdgx4/eQf7yJYgvG8wfq1dnYywaZE6DOymW3VK")]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("AccountsSQL",f)

    #useraccounts
    f = prepfile("CustomerAccountsSQL")
    tablename = 'Customer'
    for item in useraccounts:
        values = [ useraccounts[item]['UserID'], useraccounts[item]['name'], str(0) ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("CustomerAccountsSQL",f)

    #useraccounts
    f = prepfile("FranchisorAccountsSQL")
    tablename = 'FranchiseOwner'
    for item in franchisoraccounts:
        values = [ franchisoraccounts[item]['UserID'], franchisoraccounts[item]['FNAME'] ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("FranchisorAccountsSQL",f)

    #restaurants
    f = prepfile("RestaurantsSQL")
    tablename = 'Restaurant'
    for item in restaurants:
        values = [
            restaurants[item]['Store_Name'],
            restaurants[item]['Location'],
            restaurants[item]['UserID'],
            restaurants[item]['Capacity'],
            restaurants[item]['Area'],
            restaurants[item]['Opening_hours'],
            restaurants[item]['Closing_hours'],
            restaurants[item]['url']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("RestaurantsSQL",f)

    #tables
    f = prepfile("TablesSQL")
    tablename = 'Tables'
    for item in Tablestable:
        values = [
            Tablestable[item]['Location'],
            Tablestable[item]['UserID'],
            Tablestable[item]['TableNum'],
            Tablestable[item]['Capacity']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("TablesSQL",f)

    f = prepfile("FoodsSQL")
    tablename = 'Food'
    for item in Foodstable:
        values = [
            Foodstable[item]['Location'],
            Foodstable[item]['UserID'],
            Foodstable[item]['Name'],
            Foodstable[item]['Cuisine'],
            Foodstable[item]['Type'],
            Foodstable[item]['Price']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("FoodsSQL",f)

    f = prepfile("SpecialOperatingHrsSQL")
    tablename = 'Special_Operating_Hrs'
    for item in SpecialOperatingHrsTable:
        values = [
            SpecialOperatingHrsTable[item]['Location'],
            SpecialOperatingHrsTable[item]['UserID'],
            SpecialOperatingHrsTable[item]['Day_of_week'],
            SpecialOperatingHrsTable[item]['Opening_hours'],
            SpecialOperatingHrsTable[item]['Closing_hours']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("SpecialOperatingHrsSQL",f)

    f = prepfile("ReservationsSQL")
    tablename = 'Reservation'
    #print(reservations)
    for item in reservations:
        values = [
            reservations[item]['Customer_UserID'],
            reservations[item]['TableNum'],
            reservations[item]['Location'],
            reservations[item]['Restaurant_UserID'],
            reservations[item]['Pax'],
            reservations[item]['DateTime'],
            reservations[item]['Rating']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("ReservationsSQL",f)

    f = prepfile("PossiblevoucherSQL")
    tablename = 'Possible_voucher'
    #print(reservations)
    for item in possibleVouchers:
        values = [
            possibleVouchers[item]['Voucher_code'],
            possibleVouchers[item]['Discount'],
            possibleVouchers[item]['Description'],
            possibleVouchers[item]['Cost']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("PossiblevoucherSQL",f)

    f = prepfile("CustomervoucherSQL")
    tablename = 'Customer_voucher'
    print(list(customerVouchers.values())[0])
    for item in customerVouchers:

        values = [
            customerVouchers[item]['Voucher_code'],
            customerVouchers[item]['UserID'],
            customerVouchers[item]['Is_used']
        ]
        sql = generateInsertString(tablename,values)
        f.write(sql)
    endfile("CustomervoucherSQL",f)

def prepfile(filename):
    if os.path.exists(filename+'.js'):
        os.remove(filename+'.js')
    f= open(filename + '.js',"w+")
    f.write("const "+filename+" = \n")
    f.write("`\n")
    return f
def endfile(filename,f):
    f.write("`\n")
    f.write("function get"+filename+"() { return "+filename+" ;}\n")
    f.write("module.exports = "+"get"+filename +";")
    f.close()

def ot():
    ls = []
    f= open("test.txt","r")
    for line in f.readlines():
        l =line.strip()
        #l = l.split(" ")
        if not l:
            continue
        l = l.capitalize()
        ls.append(l)
    print (ls)
    f.close()

# ot()
generateUser()
generateFranchisor()
generateRestaurants()
generateReservations()
generateVouchers()
generateSQL()

#