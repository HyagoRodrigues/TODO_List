/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package TODO_List;

import Objects.Task;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class AppTest {
    static List<Task> tasks = new ArrayList<>();
    @Test
    public void testAddTask() {
        Task task = new Task("Teste", "Teste", "Teste", 1, "Teste", "Teste");

        tasks.add(task);
        assertEquals(1,tasks.size());
        System.out.println("Tarefa adicionada com sucesso!");
    }
}