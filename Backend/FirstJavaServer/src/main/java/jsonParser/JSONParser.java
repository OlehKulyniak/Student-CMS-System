package jsonParser;

import org.json.JSONObject;

import java.io.BufferedReader;

public class JSONParser {
    public static JSONObject getRequestJSON(BufferedReader buffReader) {
        StringBuilder strBuild = new StringBuilder();
        String line;
        try {
            while ((line = buffReader.readLine()) != null) {
                strBuild.append(line);
            }
        }
        catch(Exception error) {
            error.printStackTrace();
            return null;
        }
        return new JSONObject(strBuild.toString());
    }
}
