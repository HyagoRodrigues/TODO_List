package Testes;

import Methods.Methods;
import Object.Task;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class TestTask {
    static List<Task> tasks = new ArrayList<>();
    @Test
    public void testAddTask() {
        Task task = new Task("Teste", "Teste", "Teste", 1, "Teste", "Teste");

        tasks.add(task);
        assertEquals(1, tasks.size());
        System.out.println("Tarefa adicionada com sucesso!");
    }

}
