package myM101J.Week2.Hw3;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.codecs.DocumentCodec;
import org.bson.codecs.EncoderContext;
import org.bson.conversions.Bson;
import org.bson.json.JsonMode;
import org.bson.json.JsonWriter;
import org.bson.json.JsonWriterSettings;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static com.mongodb.client.model.Sorts.*;

public class findTest {

	public static void main(String[] args) {
		MongoClient client = new MongoClient();
		MongoDatabase database = client.getDatabase("students");
		MongoCollection<Document> collection = database.getCollection("grades");
		
		System.out.println("Find One: ");
		Document result = collection.find().first();
		printJson(result);
		
//		System.out.println("Find All with into: ");
//		List<Document> all = document.find().into(new ArrayList<Document>());
//		for (Document current : all){
//			printJson(current);
//		}
		
		System.out.println("Find using cursor");
		Document filterCur = new Document("type","homework")
				              .append("student_id", new Document("$gt",100).append("$lt", 102));
		
		MongoCursor<Document> manyCursor = collection.find(filterCur).iterator();
		try{
			while(manyCursor.hasNext()){
				printJson(manyCursor.next());
			}
		}finally {
			manyCursor.close();
		}
		
		System.out.println("Find using cursor...filter");
//		Bson filter = and(eq("type", "homework"),gt("student_id",150),lt("student_id",170));
		Bson filter = eq("type", "homework");		
		//Bson projections.js = exclude("_id");
		Bson sort = orderBy(ascending("student_id"),ascending("score"));
		int student = 500;
		
		MongoCursor<Document> filterCursor = collection
				                             .find(filter)
				                             .sort(sort)
//				                             .projection(projections.js)
//				                             .limit(10)
				                             .iterator();
		try {
			while (filterCursor.hasNext()) {
				Document document = filterCursor.next(); 
				int currentStudent= document.getInteger("student_id");
				
				if (currentStudent != student){
					printJson(document);
					System.out.println("ID is: " + document.get("_id"));
					collection.deleteOne(new Document("_id",document.get("_id")));
					student = currentStudent;
				}
			}
		} finally {
			filterCursor.close();
		}
		
		System.out.println("Count of Cursor: " + collection.count());
	}

    public static void printJson(Document document) {
        JsonWriter jsonWriter = new JsonWriter(new StringWriter(),
                                               new JsonWriterSettings(JsonMode.SHELL, true));
        new DocumentCodec().encode(jsonWriter, document,
                                   EncoderContext.builder()
                                                 .isEncodingCollectibleDocument(true)
                                                 .build());
        System.out.println(jsonWriter.getWriter());
        System.out.flush();
    }	

}

