def determine_history(sequence)
  new_arr = []
  idx = 1
  while idx < sequence.size
    new_arr << sequence[idx] - sequence[idx - 1]
    idx += 1
  end

  new_arr
end

f = File.new('puzzle_9.txt').readlines
all_lines = f.map { |line| line.gsub("\n", '').split(' ').map(&:to_i) }

all_lines.map! do |main_seq|
  histories_arr = [main_seq]

  current_seq = main_seq
  while !current_seq.all? { |num| num == 0 }
    current_seq = determine_history(current_seq)
    histories_arr << current_seq
  end

  idx = -1
  histories_arr = histories_arr.reverse!.map do |sequence|
    idx += 1
    if idx == 0
      sequence << 0
    else
      sequence.unshift(sequence[0] - histories_arr[idx - 1][0])
    end
  end

  histories_arr[-1][0] #Retrieve last num
end

p all_lines.inject(0) { |sum, num| sum + num }

# SOLUTION 1

# def determine_history(sequence)
#   new_arr = []
#   idx = 1
#   while idx < sequence.size
#     new_arr << sequence[idx] - sequence[idx - 1]
#     idx += 1
#   end

#   new_arr
# end

# f = File.new('puzzle_9.txt').readlines
# all_lines = f.map { |line| line.gsub("\n", '').split(' ').map(&:to_i) }

# all_lines.map! do |main_seq|
#   histories_arr = [main_seq]

#   current_seq = main_seq
#   while !current_seq.all? { |num| num == 0 }
#     current_seq = determine_history(current_seq)
#     histories_arr << current_seq
#   end

#   idx = -1
#   histories_arr = histories_arr.reverse!.map do |sequence|
#     idx += 1
#     if idx == 0
#       sequence << 0
#     else
#       sequence << histories_arr[idx - 1][-1] + sequence[-1]
#     end
#   end

#   histories_arr[-1][-1] #Retrieve last num
# end

# p all_lines.inject(0) { |sum, num| sum + num }