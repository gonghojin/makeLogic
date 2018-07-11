import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ReadFileInClassPath {
        public static String getContent(String filePath) {
            // ClassPath
            ClassPathResource resource = new ClassPathResource(filePath);
            StringBuilder sb = new StringBuilder();

            try (BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line).append("\n");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            return sb.toString();
        }
    }
}
